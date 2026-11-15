"""Map existing Express snake_case keys to the exact checkpoint feature names."""
import json
from pathlib import Path
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, StringConstraints, create_model

FIELDS = json.loads((Path(__file__).resolve().parents[2] / "shared" / "assessmentFields.json").read_text(encoding="utf-8"))
SECTIONS = {
    "radiation": "Radiation", "psychological": "Psychological", "gravity": "Gravity",
    "respiration": "Respiration", "nutrition": "Nutrition",
}
# Spreadsheet glyphs differ from the labels used in the existing browser forms.
FEATURE_NAMES = {"pao2": "PaO₂", "paco2": "PaCO₂"}
NUMBER = Annotated[float, Field(strict=True, allow_inf_nan=False)]
TEXT = Annotated[str, StringConstraints(strict=True, strip_whitespace=True, min_length=1)]


class AssessmentIdentity(BaseModel):
    model_config = ConfigDict(extra="forbid")
    astronaut_id: TEXT
    mission: TEXT
    day: Annotated[int, Field(strict=True, ge=0)]


REQUESTS = {
    group: create_model(
        f"{group.title()}Request", __base__=AssessmentIdentity,
        **{field["key"]: (TEXT if field["key"] == "radiation_type" else NUMBER, None)
           for field in fields}
    ) for group, fields in FIELDS.items()
}


class SpecialistRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    measurements: dict[str, NUMBER]


def feature_keys(group):
    return {FEATURE_NAMES.get(field["key"], field["name"]): field["key"] for field in FIELDS[group]}


def assess(runtime, group, body):
    keys = feature_keys(group)
    values = body.model_dump(exclude_unset=True)
    results, skipped, used = [], [], set()
    for name, info in runtime.catalog.items():
        if info.get("section") != SECTIONS[group] or name not in runtime.loaded:
            continue
        missing = [keys.get(feature, feature) for feature in info["features"]
                   if feature not in keys or keys[feature] not in values]
        if missing:
            skipped.append({"model": name, "missing_fields": missing})
            continue
        measurements = {feature: values[keys[feature]] for feature in info["features"]}
        results.append(runtime.predict(name, measurements))
        used.update(keys[feature] for feature in info["features"])
    unused = sorted(set(values) - used - {"astronaut_id", "mission", "day"})
    return results, skipped, unused
