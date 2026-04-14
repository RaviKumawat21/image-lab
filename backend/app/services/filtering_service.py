import cv2
import numpy as np


def apply_blur(image: np.ndarray, kernel_size: int) -> np.ndarray:
    kernel = max(1, kernel_size)
    if kernel % 2 == 0:
        kernel += 1
    return cv2.GaussianBlur(image, (kernel, kernel), 0)


def apply_sharpen(image: np.ndarray, strength: float) -> np.ndarray:
    blurred = cv2.GaussianBlur(image, (0, 0), 3)
    return cv2.addWeighted(image, 1 + strength, blurred, -strength, 0)


def detect_edges(image: np.ndarray, low_threshold: int, high_threshold: int) -> np.ndarray:
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, low_threshold, high_threshold)
    return cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
