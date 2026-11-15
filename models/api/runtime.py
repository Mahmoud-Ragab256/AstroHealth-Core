"""Read-only CPU inference using the architecture and scaling in interpreter.py."""
import json
from pathlib import Path

import numpy as np
import torch
from torch import nn

BASE = Path(__file__).resolve().parents[1]
LIMITATIONS = "Prototype trained on supplied synthetic/rule-labeled data; not clinically validated"


class ModelRuntime:
    def __init__(self, base: Path = BASE):
        self.catalog = json.loads((base / "catalog.json").read_text(encoding="utf-8"))
        self.loaded = {}
        for name, item in self.catalog.items():
            if item["status"] != "TRAINED_PROTOTYPE":
                continue
            checkpoint = torch.load(base / item["model_path"], map_location="cpu", weights_only=True)
            metadata = checkpoint["metadata"]
            if metadata["features"] != item["features"]:
                raise ValueError(f"Feature contract mismatch for {name}")
            network = nn.Sequential(
                nn.Linear(len(metadata["features"]), 32), nn.ReLU(),
                nn.Linear(32, 32), nn.ReLU(), nn.Linear(32, len(metadata["classes"]))
            )
            network.load_state_dict(checkpoint["state_dict"])
            network.eval()
            self.loaded[name] = (network, metadata)

    def predict(self, name: str, measurements: dict) -> dict:
        network, metadata = self.loaded[name]
        features = metadata["features"]
        if set(measurements) != set(features):
            raise ValueError(f"Expected exactly these features: {features}")
        if any(isinstance(value, bool) or not isinstance(value, (int, float)) for value in measurements.values()):
            raise ValueError("Measurements must be finite JSON numbers")
        with np.errstate(over="ignore", invalid="ignore"):
            raw = np.asarray([measurements[key] for key in features], dtype=np.float32)
        if not np.isfinite(raw).all():
            raise ValueError("Measurements must be finite float32-compatible numbers")
        scaled = np.clip(
            (raw - np.asarray(metadata["mean"], dtype=np.float32))
            / np.asarray(metadata["std"], dtype=np.float32), -15, 15
        )
        with torch.inference_mode():
            logits = network(torch.from_numpy(scaled).unsqueeze(0)).squeeze(0)
            if metadata.get("target_mode") == "multilabel_sigmoid":
                probabilities = torch.sigmoid(logits)
                picked = [index for index, probability in enumerate(probabilities)
                          if float(probability) >= float(metadata.get("threshold", 0.5))]
                if not picked:
                    picked = [int(probabilities.argmax())]
            else:
                probabilities = torch.softmax(logits, dim=0)
                picked = [int(probabilities.argmax())]
        return {
            "model": name,
            "status": "PREDICTED_PROTOTYPE",
            "measurements": measurements,
            "predicted_labels": [metadata["classes"][index] for index in picked],
            "model_score_not_clinical_probability": float(probabilities[picked[0]]),
            "limitations": LIMITATIONS,
        }
