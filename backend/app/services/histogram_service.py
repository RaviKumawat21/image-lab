import cv2
import numpy as np


def equalize_histogram(image: np.ndarray) -> np.ndarray:
    if len(image.shape) == 2:
        return cv2.equalizeHist(image)

    ycrcb = cv2.cvtColor(image, cv2.COLOR_BGR2YCrCb)
    ycrcb[:, :, 0] = cv2.equalizeHist(ycrcb[:, :, 0])
    return cv2.cvtColor(ycrcb, cv2.COLOR_YCrCb2BGR)


def adaptive_equalize(image: np.ndarray, clip_limit: float, tile_grid_size: int) -> np.ndarray:
    tile = max(1, tile_grid_size)
    clahe = cv2.createCLAHE(clipLimit=max(clip_limit, 0.1), tileGridSize=(tile, tile))

    if len(image.shape) == 2:
        return clahe.apply(image)

    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    lab[:, :, 0] = clahe.apply(lab[:, :, 0])
    return cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
