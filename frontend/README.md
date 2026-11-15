# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# Backend integration

Start the backend on port 5000 (`node src/index.js` from `backend`) and run
`npm run dev` here. Vite proxies `/api` to `http://localhost:5000`; a separate
CORS configuration is unnecessary for this same-origin development setup.
For production, configure the hosting reverse proxy to route `/api/*` to Express.

All five assessment forms use `../shared/assessmentFields.js` for keys, labels,
and units. They require astronaut ID, mission, day, and at least one measurement.
Metadata comes from `localStorage.astronautData`. Configure the astronaut ID,
mission and day once at `/profile`; existing name, weight and sex are preserved.
This browser profile is not authentication. Blank measurements are omitted, not sent as null or zero. Pending
submissions are locked; errors preserve inputs. Successful submissions navigate
to the saved report, which can be refreshed without re-submitting the assessment.

Reports history reads real records by astronaut ID. Static example reports in
`src/data` are not used as live results. Other dashboard examples retain their
demonstration labels.

Verification:

- `npm test`: payload and API-client checks.
- `npm run build` and `npm run lint`.
- Start Vite on `127.0.0.1:5173`, then `npm run test:browser` on Windows with
  Chrome or Edge installed (or set `BROWSER_PATH`). This uses mocked API responses
  and checks all five forms, report refresh, failure recovery, duplicate
  prevention, and a mobile viewport. It does not write to MongoDB.

## Wellbeing and practice

PHQ-9 presents all nine questions, requires complete answers, and computes a
0?27 screening score. Individual answers are held in memory only; a calculated
score is included as `phq_9` when the psychological measurements are submitted.
This is distinct from model predictions. Question 9 triggers follow-up guidance
independent of the total. Sources: [questionnaire](https://www.apa.org/depression-guideline/patient-health-questionnaire.pdf) and [scoring](https://www.hiv.uw.edu/page/mental-health-screening/phq-9).

Puzzles award 10 points per correct answer. Completed sessions are saved in
`astro_puzzles_stats`; unfinished sessions are not counted.
