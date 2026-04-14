import cv2
import numpy as np


def gamma_correction(image: np.ndarray, gamma: float) -> np.ndarray:
    gamma = max(gamma, 0.01)
    inv_gamma = 1.0 / gamma
    table = np.array(
        [((index / 255.0) ** inv_gamma) * 255 for index in np.arange(256)],
        dtype=np.uint8,
    )
    return cv2.LUT(image, table)


def negative_transformation(image: np.ndarray) -> np.ndarray:
    return cv2.bitwise_not(image)
