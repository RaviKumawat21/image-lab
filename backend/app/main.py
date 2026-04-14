from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import filtering, histogram, intensity, morphology, segmentation


app = FastAPI(title="Image Lab API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(intensity.router, prefix="/intensity", tags=["intensity"])
app.include_router(histogram.router, prefix="/histogram", tags=["histogram"])
app.include_router(filtering.router, prefix="/filtering", tags=["filtering"])
app.include_router(segmentation.router, prefix="/segmentation", tags=["segmentation"])
app.include_router(morphology.router, prefix="/morphology", tags=["morphology"])


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
