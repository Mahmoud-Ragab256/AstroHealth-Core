# FastAPI model service

Run from the repository root. The supplied checkpoints are loaded on CPU once
at startup, with `weights_only=True`, and reused for inference. The network,
normalization, clipping, softmax/sigmoid, thresholds, and labels match
`interpreter.py`. Startup fails if a checkpoint is missing or inconsistent.

## Install and start (Windows PowerShell)

```powershell
python -m venv models/.venv
models/.venv/Scripts/python.exe -m pip install torch --index-url https://download.pytorch.org/whl/cpu
models/.venv/Scripts/python.exe -m pip install -r models/requirements-api.txt
models/.venv/Scripts/python.exe -m uvicorn models.api.main:app --host 127.0.0.1 --port 8000
```

On Linux/macOS use `models/.venv/bin/python` instead. Python 3.13 is the local
verification environment. Swagger UI: `http://127.0.0.1:8000/docs`.
Health: `GET /health` reports the number of loaded models (16).

Express defaults to `http://localhost:8000`. Set
`MODEL_API_URL=http://127.0.0.1:8000` in `backend/.env` to select this service
explicitly. Keep `MONGODB_URI` pointing at the intended database. Start Express
from `backend` with `node src/index.js`; start the frontend with `npm run dev`.
The browser calls Express through Vite's proxy, never the model service directly.

## Existing assessment paths

All paths accept the same snake_case measurement keys as Express plus required
`astronaut_id`, `mission`, and integer `day >= 0`:

| POST path | Specialists |
| --- | --- |
| `/api/radiation` | immune_system, radiation_biodosimetry, radiation_exposure |
| `/api/psychological` | sleep_quality |
| `/api/gravity` | bone_health, muscle_balance, altered_gravity |
| `/api/respiration` | respiration |
| `/api/nutrition` | iron_hemoglobin, hydration, nutrition_monitor |

The shared field source is `shared/assessmentFields.json`, read by Python and
re-exported by the JavaScript module. Unicode feature names are mapped exactly
to the checkpoint contracts; values are never converted between units.

Each specialist requires **all** its declared features. A group runs every
specialist with complete inputs and explicitly lists skipped specialists and
their missing fields. Missing values are never zero-filled or imputed.
If none can run, HTTP 422 lists the missing keys. Express forwards that validation
message to the form without creating a report. Unknown, null, nonfinite,
boolean, or string numeric measurements are rejected.

`GET /api/assessment-contracts` lists required frontend keys for each specialist.
Some accepted spreadsheet fields, including PHQ-9, are not inputs to any supplied
model. They are returned as `unused_fields` and remain in the saved submitted
values; they are never presented as analyzed. Sleep Quality is a training target,
not a feature. Models and their limitations are listed by `GET /api/models`.

Example complete respiration request:

```json
{
  "astronaut_id": "AST-001",
  "mission": "Test mission",
  "day": 1,
  "pao2": 90,
  "paco2": 40,
  "blood_ph": 7.4
}
```

The result includes `assessment_type`, `status`, `predictions`, `skipped_models`,
`unused_fields`, and `limitations`. Each prediction preserves the original
interpreter's labels and `model_score_not_clinical_probability`.
`PARTIAL_PROTOTYPE` means some specialists were skipped, not that missing values
were inferred. These models use synthetic/rule-derived labels and are not
clinically validated; this limitation is included in every result.

Express saves the entire response under `report.modelResponse`, alongside the
original inputs, then returns HTTP 201 with the saved report to the frontend.
FastAPI does not write health data to disk or connect to MongoDB.

## Other trained specialists

`POST /api/models/{model_name}/predict` exposes each trained model, including
`kidney_bmp`, `kidney_urinalysis`, `liver`, `heart_vitals`, and `cardiovascular`.
Its body is `{"measurements": {"Exact Feature Name": 1.0, ...}}` and requires
exactly the model's declared features. Use `examples/*_input.json` as examples
of the inner measurements object. Unknown models return 404; catalog entries
without trained checkpoints (ECG, lipid panel, toxins) return 409.
These additional specialists do not create new frontend assessment screens.

## Verification

```powershell
models/.venv/Scripts/python.exe -m pip install -r models/requirements-test.txt
models/.venv/Scripts/python.exe -m pytest models/tests -q
node --test backend/tests/assessments.test.js frontend/tests/assessment-payload.test.js
```

With FastAPI running, test the real Express-to-model HTTP path:

```powershell
$env:RUN_MODEL_INTEGRATION = '1'
$env:MODEL_API_URL = 'http://127.0.0.1:8000'
node --test backend/tests/model-integration.test.js
```

The Python suite loads real checkpoints, tests all 16 specialists against the
original interpreter, tests all five group endpoints, and checks invalid/partial
inputs. The JavaScript suite verifies error propagation and report persistence
behavior using a mocked database. See the HTTP integration test for an Express
request through the running FastAPI service with real inference.
