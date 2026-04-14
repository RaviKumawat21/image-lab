from fastapi import APIRouter, File, UploadFile

from app.services.filtering_service import apply_blur, apply_sharpen, detect_edges
from app.utils.image_utils import decode_upload, encode_image


router = APIRouter()


@router.post("/blur")
async def blur_image(file: UploadFile = File(...), kernel_size: int = 5):
    image = await decode_upload(file)
    result = apply_blur(image, kernel_size)
    return encode_image(result)


@router.post("/sharpen")
async def sharpen_image(file: UploadFile = File(...), strength: float = 1.0):
    image = await decode_upload(file)
    result = apply_sharpen(image, strength)
    return encode_image(result)


@router.post("/edge")
async def edge_image(
    file: UploadFile = File(...),
    low_threshold: int = 75,
    high_threshold: int = 150,
):
    image = await decode_upload(file)
    result = detect_edges(image, low_threshold, high_threshold)
    return encode_image(result)
