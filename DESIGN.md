---
version: alpha
name: AstroHealth
description: Existing mission health dashboard and assessment forms.
colors:
  primary: "#1D4F9C"
  navy: "#0A1B33"
  surface: "#EDF2F9"
  ink: "#203040"
  muted: "#566678"
  line: "#D8E0E7"
typography:
  sans:
    fontFamily: '"Atkinson Hyperlegible", system-ui, sans-serif'
rounded:
  card: "1.5rem"
  input: "1rem"
spacing:
  section-gap: "1.5rem"
components:
  form: {}
  input: {}
  report: {}
---

# AstroHealth Design System

## Overview
Preserve the existing mission dashboard: navy navigation, pale workspace,
white assessment cards, English controls and existing Arabic page subtitles.
This is a product workflow for entering measurements and reading model reports.
Do not invent clinical results, normal ranges, or astronaut identities.
Runtime tokens in `frontend/src/styles/index.css` remain canonical; this file
mirrors them. Existing banners and surrounding layouts remain in place.

## Colors
Use primary for actions, navy/ink for headings, muted for help, and line for
borders. Saved state uses the existing health token. Error text is red with a
written message; color never conveys status alone.

## Typography
Use the runtime sans stack. Headings stay bold; values and unit descriptions
remain readable at the existing 14–16px body scale. Arabic subtitles use RTL.

## Layout
AssessmentSectionCard uses one field column on mobile and two at medium widths.
Units appear below controls so long assay units do not overlap typed values.
Maintain the inherited sidebar, banners, and 24px section gaps.

## Elevation & Depth
White cards, restrained borders, and existing small shadows. No new overlays.

## Shapes
Reuse rounded cards, rounded inputs, and pill-shaped primary actions.

## Components
AssessmentForm owns all five submission workflows. AssessmentSectionCard and
LabInput own field layout and label activation. SavedReport owns persisted
report presentation; model output renders as text and structured lists.

## Motion
Use existing short color transitions. No decorative motion in assessment forms.

## Accessibility
Use native numeric inputs, linked labels, visible focus, error live regions,
and disabled pending controls. Tables scroll within their container on mobile.

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
