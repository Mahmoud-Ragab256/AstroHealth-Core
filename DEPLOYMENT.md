# Vercel deployment

Deploy the repository root, not the frontend directory. vercel.json builds the
Vite frontend and exposes Express at /api/* and FastAPI at /model/*.
Node 22 and Python 3.12 are used. Python installs CPU-only PyTorch.

Required encrypted environment: MONGODB_URI (existing MongoDB database).
Set VERCEL_SUPPORT_LARGE_FUNCTIONS=1 for the PyTorch function bundle.
MODEL_API_URL is optional: by default the backend calls this deployment /model.
Preview protection requires VERCEL_AUTOMATION_BYPASS_SECRET for internal calls.
Production must be reachable for the internal model call to succeed.

Checks: /api/health, /model/health, /model/api/assessment-contracts.
Reports require a reachable MongoDB URI and network access configured at Atlas.
Frontend uses same-origin /api; no localhost URL is included in production.
Assets are immutable and fingerprinted; reports use Cache-Control: no-store.
The existing application does not implement user authentication.
