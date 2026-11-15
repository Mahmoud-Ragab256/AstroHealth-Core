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

Do not use demo identity values in real requests. Read actual metadata from the saved astronaut profile; do not persist health inputs to browser storage. Reuse the field definitions
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

## Profile and psychological workflows

Assessment metadata comes from astronautData in localStorage. The /profile
page saves mission and day once and preserves existing profile fields. Never
overwrite the saved profile on application mount. Missing settings block
submission with a link to setup. Reports use the saved astronaut ID.

Psychological navigation has distinct headings and compact banners. The PHQ-9
uses nine labelled radio groups, an answered count, explicit score calculation,
and an independent question-9 follow-up message. Answers remain in memory; only
the calculated score accompanies an assessment submission. Screening and AI
results remain distinct. Puzzles use inline panels, explicit answer confirmation,
keyboard focus transitions, memory preview, and 10 points per correct answer.
Only completed sessions persist; double activation cannot award extra points.

## Automatic demo setup

At the user's request, missing profile metadata is now filled on app startup:
AstroHealth Demo Mission, mission day 0, and a unique DEMO-prefixed astronaut ID
only when no ID exists. Existing identity, mission, day and extra fields are
preserved. Settings remain editable at /profile. This supersedes the previous
manual-setup requirement for missing metadata; measurement values are never
automatically invented. Storage failures still leave the setup error visible.
