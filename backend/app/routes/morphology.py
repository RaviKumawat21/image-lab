from fastapi import APIRouter, File, UploadFile

from app.services.morphology_service import morphology_transform
from app.utils.image_utils import decode_upload, encode_image


router = APIRouter()


@router.post("/transform")
async def apply_morphology(
    file: UploadFile = File(...),
    operation: str = "open",
    kernel_size: int = 3,
    iterations: int = 1,
):
    image = await decode_upload(file)
    result = morphology_transform(image, operation, kernel_size, iterations)
    return encode_image(result)
