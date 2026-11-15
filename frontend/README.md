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
Metadata is entered explicitly because this demo has no authenticated astronaut
profile. Blank measurements are omitted, not sent as null or zero. Pending
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
