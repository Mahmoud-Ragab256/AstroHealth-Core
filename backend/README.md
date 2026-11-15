# Assessment API

Run `node src/index.js` from `backend`. Set `MONGODB_URI` in `.env`.
`MODEL_API_URL` defaults to `http://localhost:8000` (origin only).

All five endpoints accept JSON and forward it unchanged with POST to the same
path on the model server:

| Backend path | Default model URL |
| --- | --- |
| `/api/radiation` | `http://localhost:8000/api/radiation` |
| `/api/psychological` | `http://localhost:8000/api/psychological` |
| `/api/gravity` | `http://localhost:8000/api/gravity` |
| `/api/respiration` | `http://localhost:8000/api/respiration` |
| `/api/nutrition` | `http://localhost:8000/api/nutrition` |

Every request requires non-empty string `astronaut_id` and `mission`, integer
`day >= 0`, and at least one recognized measurement. Measurements must be JSON
numbers, except `radiation_type`, which is a non-empty string. Zero and negative
numbers are preserved (for example BMD T-score). Low/normal/high interpretation
belongs to the model; these endpoints do not diagnose or apply reference ranges.

Example respiration request:

```json
{
  "astronaut_id": "AST-001",
  "mission": "Mission name",
  "day": 12,
  "pao2": 90,
  "paco2": 40,
  "blood_ph": 7.4
}
```

## Measurement keys

- Gravity: `bmd_t_score`, `bone_density_change`, `calcium`, `vitamin_d`,
  `muscle_mass`, `muscle_strength`, `muscle_loss`, `balance_score`,
  `physical_performance`, `orthostatic_tolerance`, `p1np`, `ctx_i`, `osteocalcin`.
- Respiration: `pao2`, `paco2`, `blood_ph`.
- Nutrition: `protein_intake`, `ferritin`, `hemoglobin_male`, `hemoglobin_female`,
  `transferrin_saturation`, `serum_iron`, `vitamin_k`, `omega_3`,
  `hydration_score`, `urine_specific_gravity`, `urine_volume`, `body_weight`.
  Send the applicable hemoglobin field; both are not required.
- Psychological: `sleep_duration`, `sleep_efficiency`, `sleep_latency`,
  `awakenings`, `mood_score`, `stress_score`, `phq_9`, `attention`, `memory`,
  `decision_making`, `reaction_time`, `sleep_quality`.
- Radiation: `absorbed_dose`, `equivalent_dose`, `effective_dose`,
  `cumulative_radiation_dose`, `wbc`, `neutrophils_absolute`,
  `lymphocytes_absolute`, `monocytes_absolute`, `eosinophils_absolute`,
  `basophils_absolute`, `gamma_h2ax`, `comet_assay`, `micronucleus_assay`,
  `radiation_type`, `exposure_duration`.

Units for all five tests are in `../shared/assessmentFields.js`, re-exported from
`src/assessmentFields.js`. The frontend imports the same definitions. In particular,
`bmd_t_score` is not density in g/cm², muscle mass/strength are relative to
baseline, and `orthostatic_tolerance` is seconds. The sheet specifies body weight
as kg / % change and several assays without fixed units: the frontend and model
must agree on the representation and may send extra context in the body.

## Saved report and response

The model must return a successful HTTP status and a non-empty JSON object.
Its complete result is preserved under `report.modelResponse`; no fixed model
result shape is assumed. Additional submitted context is preserved too.

After the model finishes, one atomic insert into `reports` stores:

- `assessment`: server-assigned name, type, and date.
- `astronaut`: id, mission, and day from the request.
- `submittedValues`: the complete request JSON.
- `inputMeasurements`: recognized keys with names, units, and submitted values.
- `modelResponse`: the complete model JSON, including unknown/nested fields.
- MongoDB `_id` and timestamps.

Only after saving succeeds, the API returns HTTP **201** with
`{ "message": "Success", "report": <complete saved document> }`.
The frontend should render the returned `report` and its `modelResponse`.
Legacy reports keep their existing interpreted fields. New raw model outputs
are not copied into legacy diagnosis fields or filled with invented defaults.

New measurements live inside reports; there is no second write to
`measurements`. `/api/analytics/:astronautId` combines legacy measurements with
new report measurements, avoiding partial saves and duplicate records.

Errors: **400** invalid input; **502** model failure/invalid JSON;
**504** model timeout (30 seconds); **500** report persistence failure.
Model failures do not create reports. A failed save never returns success.

The frontend forms submit this JSON, omit blank measurements, and navigate to
the saved report. Vite proxies same-origin `/api` requests to this backend.
`GET /api/reports/:id` returns `{ report }` and supports refreshing a report page.
`GET /api/reports?astronaut_id=AST-001` returns `{ reports }`, newest first,
limited to 100 records for the requested astronaut.

## Verification

Run `npm test`. Tests mock model HTTP and database writes while validating saved
documents with the actual Mongoose schema. They do not replace a live model and
MongoDB integration check.
