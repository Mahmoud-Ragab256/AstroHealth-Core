from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from .contracts import REQUESTS, SECTIONS, SpecialistRequest, assess, feature_keys
from .runtime import LIMITATIONS, ModelRuntime

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app):
    app.state.runtime = ModelRuntime()
    yield
    app.state.runtime = None


app = FastAPI(title="AstroHealth Model API", version="1.0.0", lifespan=lifespan,
              description="CPU inference for supplied prototype models. Not clinically validated.")


@app.exception_handler(RequestValidationError)
async def validation_error(_request, error):
    # Do not echo patient values or Pydantic's non-JSON exception context.
    errors = [{"field": ".".join(map(str, item["loc"])), "message": item["msg"]}
              for item in error.errors()]
    return JSONResponse(status_code=422, content={"message": "Invalid assessment input", "errors": errors})


@app.get("/health")
def health(request: Request):
    return {"status": "ok", "loaded_models": len(request.app.state.runtime.loaded)}


@app.get("/api/models")
def list_models(request: Request):
    runtime = request.app.state.runtime
    return {"models": {name: {key: value for key, value in item.items() if key != "model_path"}
                       for name, item in runtime.catalog.items()}, "limitations": LIMITATIONS}


@app.get("/api/assessment-contracts")
def assessment_contracts(request: Request):
    runtime = request.app.state.runtime
    return {group: {"models": {
        name: {"required_fields": [feature_keys(group).get(feature, feature) for feature in info["features"]]}
        for name, info in runtime.catalog.items()
        if info.get("section") == section and name in runtime.loaded
    }} for group, section in SECTIONS.items()}


def group_endpoint(group):
    def endpoint(body, request: Request):
        try:
            results, skipped, unused = assess(request.app.state.runtime, group, body)
        except ValueError as error:
            return JSONResponse(status_code=422, content={"message": str(error)})
        except Exception:
            logger.exception("Inference failed for assessment %s", group)
            return JSONResponse(status_code=500, content={"message": "Model inference failed"})
        if not results:
            return JSONResponse(status_code=422, content={
                "message": "Provide all required measurements for at least one specialist model",
                "skipped_models": skipped, "unused_fields": unused,
            })
        return {
            "assessment_type": group,
            "status": "PARTIAL_PROTOTYPE" if skipped else "PREDICTED_PROTOTYPE",
            "predictions": results,
            "skipped_models": skipped,
            "unused_fields": unused,
            "limitations": LIMITATIONS,
        }
    endpoint.__annotations__["body"] = REQUESTS[group]
    endpoint.__name__ = f"assess_{group}"
    return endpoint


for group in SECTIONS:
    app.post(f"/api/{group}", tags=["Assessments"])(group_endpoint(group))


@app.post("/api/models/{model_name}/predict", tags=["Specialists"])
def predict_specialist(model_name: str, body: SpecialistRequest, request: Request):
    runtime = request.app.state.runtime
    if model_name not in runtime.catalog:
        raise HTTPException(status_code=404, detail="Unknown model")
    if model_name not in runtime.loaded:
        return JSONResponse(status_code=409, content={"message": runtime.catalog[model_name]["reason"]})
    try:
        return runtime.predict(model_name, body.measurements)
    except ValueError as error:
        return JSONResponse(status_code=422, content={"message": str(error)})
    except Exception:
        logger.exception("Inference failed for specialist %s", model_name)
        return JSONResponse(status_code=500, content={"message": "Model inference failed"})
