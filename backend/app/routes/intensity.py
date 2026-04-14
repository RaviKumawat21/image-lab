from fastapi import APIRouter, File, UploadFile

from app.services.intensity_service import gamma_correction, negative_transformation
from app.utils.image_utils import decode_upload, encode_image


router = APIRouter()


@router.post("/gamma")
async def apply_gamma(file: UploadFile = File(...), gamma: float = 1.0):
    image = await decode_upload(file)
    result = gamma_correction(image, gamma)
    return encode_image(result)


@router.post("/negative")
async def apply_negative(file: UploadFile = File(...)):
    image = await decode_upload(file)
    result = negative_transformation(image)
    return encode_image(result)
