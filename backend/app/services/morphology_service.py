import cv2
import numpy as np


def morphology_transform(image: np.ndarray, operation: str, kernel_size: int, iterations: int) -> np.ndarray:
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

    kernel_value = max(1, kernel_size)
    kernel = np.ones((kernel_value, kernel_value), np.uint8)

    operations = {
        "erode": cv2.MORPH_ERODE,
        "dilate": cv2.MORPH_DILATE,
        "open": cv2.MORPH_OPEN,
        "close": cv2.MORPH_CLOSE,
    }
    morph_op = operations.get(operation, cv2.MORPH_OPEN)
    result = cv2.morphologyEx(binary, morph_op, kernel, iterations=max(1, iterations))
    return cv2.cvtColor(result, cv2.COLOR_GRAY2BGR)
