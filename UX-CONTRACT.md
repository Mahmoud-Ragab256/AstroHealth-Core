# Assessment workflow contract

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Form | AssessmentForm + AssessmentSectionCard + LabInput | shared/assessmentFields.js and backend validation | Five assessment types | Payload tests and browser smoke |
| Select/Listbox | LabInput native select | Existing native control behavior | Existing unrelated forms | Native keyboard behavior |
| Date | Native date input | Existing report filter examples | Native browser date picker | Platform-owned controls |
| Scrollbar | frontend/src/styles/index.css | Runtime styles | Report table overflow | Narrow viewport smoke |
| Toast | Inline role=status / role=alert in AssessmentForm | Server response | Pending and failure | Browser smoke |
| CRUD | api/assessments.js and saved report routes | backend API | Create and read only | Backend and browser tests |

The five tests submit only recognized measurement keys and required astronaut_id,
mission, and day. Blank measurements are omitted; zero and negative numbers are
preserved. At least one measurement is required. All numeric inputs allow decimals
except mission day. Clinical ranges are interpreted by the external model.

Do not use demo identity values in real requests. Capture actual metadata in the
form; do not persist health inputs to browser storage. Reuse the field definitions
across backend and frontend rather than maintaining separate mappings.

On submit, prevent duplicate activation and lock the form until the request
settles. Retain values on errors. Do not automatically retry writes. Navigate to
the saved report only on success. Detail reloads use GET so refresh never resubmits.
Abort abandoned reads and ignore stale results. Aborting a POST does not promise
server rollback. Reports render all model fields without invented interpretations.

Reports history requires an astronaut ID and shows up to 100 real database
reports. Existing static report examples remain source fixtures, not live records.
No authentication contract is introduced by this integration; existing deployment
access controls still apply.
