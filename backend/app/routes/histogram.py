from fastapi import APIRouter, File, UploadFile

from app.services.histogram_service import adaptive_equalize, equalize_histogram
from app.utils.image_utils import decode_upload, encode_image


router = APIRouter()


@router.post("/equalize")
async def apply_equalization(file: UploadFile = File(...)):
    image = await decode_upload(file)
    result = equalize_histogram(image)
    return encode_image(result)


@router.post("/adaptive")
async def apply_adaptive_equalization(
    file: UploadFile = File(...),
    clip_limit: float = 2.0,
    tile_grid_size: int = 8,
):
    image = await decode_upload(file)
    result = adaptive_equalize(image, clip_limit, tile_grid_size)
    return encode_image(result)
