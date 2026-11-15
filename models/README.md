# AstroHealth PyTorch Monitoring — Organ Functionality Added

The FastAPI adapter and Express integration are documented in [API.md](API.md).
Run it from the repository root with `python -m uvicorn models.api.main:app --port 8000`
after installing `requirements-api.txt` in the model virtual environment.

This version preserves the previous 13 PyTorch prototype specialists and adds **3 new PyTorch models**: `kidney_bmp`, `kidney_urinalysis`, and `liver`. All three are trained on the original supplied BMP, Urinalysis, and Hepatic Function Panel CSV datasets, respectively. No frontend or API code.

## Updated Excel measurement plan
`AstroHealth_Measurement_Ranges.xlsx` now contains three new tabs: **Kidney BMP**, **Kidney Urinalysis**, and **Liver Function**. The new tabs define the exact input feature names and units used by the models. Original sheets are retained unchanged. Original workbook's Environment and PHQ-9 measurements are *not used by any model*.

The new tabs explicitly mark reference ranges **not specified** rather than inventing clinical low/normal/high cutoffs. Source field mappings are shown in column F. Existing 'Urine Specific Gravity' and 'Calcium' measurements in other sections are distinct section-specific names; the new specialists consume only their own listed fields.

## Run
```
pip install -r requirements.txt
python interpreter.py --model kidney_bmp --input examples/kidney_bmp_input.json --output kidney_bmp_result.json
python interpreter.py --model kidney_urinalysis --input examples/kidney_urinalysis_input.json --output kidney_urinalysis_result.json
python interpreter.py --model liver --input examples/liver_input.json --output liver_result.json
```
All interpreters save real model-generated prediction labels to JSON files and reject missing/extra input features. See `models/*.json`, `catalog.json`, and `reports/organ_training_audit.json`. Some urinalysis source records contained missing values; those were imputed with **training-set medians** during training, with counts reported in the audit.

**Medical limitation:** The supplied organ datasets are synthetic/rule-derived, not verified patient data. Models are technical prototypes only; the validation scores are NOT clinical performance measures. Labels indicate learned source rules, not reliable diagnoses. No biological safety or treatment decisions should rely on them. Five originally blocked specialties now reduce to four (`ecg`, `lipid_panel`, `toxins` plus any other catalog limitations); organ functionality is supported for prototype inference.
