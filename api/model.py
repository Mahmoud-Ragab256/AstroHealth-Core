"""Vercel ASGI entrypoint. Model endpoints are served under /model."""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from models.api.main import app as model_app, lifespan as model_lifespan

@asynccontextmanager
async def lifespan(app):
    async with model_lifespan(model_app):
        yield

app = FastAPI(lifespan=lifespan, docs_url=None, openapi_url=None)
app.mount('/model', model_app)
