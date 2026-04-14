from fastapi import APIRouter, File, UploadFile

from app.services.segmentation_service import otsu_segmentation, threshold_segmentation
from app.utils.image_utils import decode_upload, encode_image


router = APIRouter()


@router.post("/threshold")
async def apply_threshold(file: UploadFile = File(...), threshold: int = 127):
    image = await decode_upload(file)
    result = threshold_segmentation(image, threshold)
    return encode_image(result)


@router.post("/otsu")
async def apply_otsu(file: UploadFile = File(...)):
    image = await decode_upload(file)
    result = otsu_segmentation(image)
    return encode_image(result)
