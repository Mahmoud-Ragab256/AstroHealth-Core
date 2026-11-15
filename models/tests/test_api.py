import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from models.api.main import app
from models.api.contracts import SECTIONS, feature_keys
from models.interpreter import predict

BASE = Path(__file__).resolve().parents[1]
CATALOG = json.loads((BASE / "catalog.json").read_text(encoding="utf-8"))
TRAINED = [name for name, info in CATALOG.items() if info["status"] == "TRAINED_PROTOTYPE"]
IDENTITY = {"astronaut_id": "AST-TEST", "mission": "Integration test", "day": 0}


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as instance:
        yield instance


@pytest.mark.parametrize("name", TRAINED)
def test_specialist_matches_original_interpreter(client, name):
    measurements = json.loads((BASE / "examples" / f"{name}_input.json").read_text(encoding="utf-8"))
    expected = predict(name, measurements)
    response = client.post(f"/api/models/{name}/predict", json={"measurements": measurements})
    assert response.status_code == 200, response.text
    actual = response.json()
    assert actual["predicted_labels"] == expected["predicted_labels"]
    assert actual["model_score_not_clinical_probability"] == pytest.approx(expected["model_score_not_clinical_probability"])
    assert actual["measurements"] == measurements
    assert actual["limitations"]


@pytest.mark.parametrize("group", SECTIONS)
def test_existing_express_paths_with_real_checkpoints(client, group):
    body = dict(IDENTITY)
    mapping = feature_keys(group)
    specialists = [name for name in TRAINED if CATALOG[name]["section"] == SECTIONS[group]]
    for name in specialists:
        example = json.loads((BASE / "examples" / f"{name}_input.json").read_text(encoding="utf-8"))
        body.update({mapping[feature]: value for feature, value in example.items()})
    response = client.post(f"/api/{group}", json=body)
    assert response.status_code == 200, response.text
    result = response.json()
    assert result["status"] == "PREDICTED_PROTOTYPE"
    assert {item["model"] for item in result["predictions"]} == set(specialists)
    assert result["skipped_models"] == []


def test_partial_groups_are_explicit_and_do_not_impute(client):
    response = client.post("/api/radiation", json={**IDENTITY, "wbc": 5000, "equivalent_dose": 0})
    assert response.status_code == 200
    result = response.json()
    assert result["status"] == "PARTIAL_PROTOTYPE"
    assert [item["model"] for item in result["predictions"]] == ["immune_system"]
    assert result["unused_fields"] == ["equivalent_dose"]
    assert result["predictions"][0]["measurements"] == {"WBC": 5000}
    assert result["skipped_models"]


def test_missing_features_and_unsupported_inputs_do_not_fake_predictions(client):
    response = client.post("/api/psychological", json={**IDENTITY, "phq_9": 5})
    assert response.status_code == 422
    assert response.json()["unused_fields"] == ["phq_9"]
    assert response.json()["skipped_models"][0]["missing_fields"] == ["sleep_duration", "sleep_efficiency", "sleep_latency", "awakenings"]


@pytest.mark.parametrize("changes", [{"pao2": "90"}, {"pao2": None}, {"pao2": True}, {"day": -1}, {"day": True}, {"mission": " "}, {"extra": 2}, {"pao2": 1e100}])
def test_invalid_data(client, changes):
    body = {**IDENTITY, "pao2": 90, "paco2": 40, "blood_ph": 7.4, **changes}
    assert client.post("/api/respiration", json=body).status_code == 422


def test_catalog_health_openapi_and_blocked_specialists(client):
    assert client.get("/health").json()["loaded_models"] == 16
    assert "kidney_bmp" in client.get("/api/models").json()["models"]
    assert "sleep_quality" in client.get("/api/assessment-contracts").json()["psychological"]["models"]
    assert client.post("/api/models/ecg/predict", json={"measurements": {}}).status_code == 409
    assert client.post("/api/models/unknown/predict", json={"measurements": {}}).status_code == 404
    assert client.post("/api/models/respiration/predict", json={"measurements": {"extra": 1}}).status_code == 422
    schemas = client.get("/openapi.json").json()["components"]["schemas"]
    assert "pao2" in schemas["RespirationRequest"]["properties"]
