from fastapi import HTTPException, UploadFile
from fastapi.responses import Response
import cv2
import numpy as np


async def decode_upload(file: UploadFile, flags: int = cv2.IMREAD_COLOR) -> np.ndarray:
    contents = await file.read()
    if not contents:
        raise HTTPException(status_code=400, detail="Empty upload")

    array = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(array, flags)
    if image is None:
        raise HTTPException(status_code=400, detail="Invalid image file")
    return image


def encode_image(image: np.ndarray, extension: str = ".png") -> Response:
    success, buffer = cv2.imencode(extension, image)
    if not success:
        raise HTTPException(status_code=500, detail="Could not encode image")

    media_type = "image/png" if extension == ".png" else "image/jpeg"
    return Response(content=buffer.tobytes(), media_type=media_type)
