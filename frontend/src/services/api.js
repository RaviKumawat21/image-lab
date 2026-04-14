import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const client = axios.create({
  baseURL: API_BASE_URL,
});

async function postImage(endpoint, file, params = {}) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await client.post(endpoint, formData, {
    params,
    responseType: "blob",
  });

  return URL.createObjectURL(response.data);
}

export const imageApi = {
  gamma: (file, gamma) => postImage("/intensity/gamma", file, { gamma }),
  negative: (file) => postImage("/intensity/negative", file),
  equalize: (file) => postImage("/histogram/equalize", file),
  adaptiveEqualize: (file, clip_limit, tile_grid_size) =>
    postImage("/histogram/adaptive", file, { clip_limit, tile_grid_size }),
  blur: (file, kernel_size) => postImage("/filtering/blur", file, { kernel_size }),
  sharpen: (file, strength) => postImage("/filtering/sharpen", file, { strength }),
  edge: (file, low_threshold, high_threshold) =>
    postImage("/filtering/edge", file, { low_threshold, high_threshold }),
  threshold: (file, threshold) => postImage("/segmentation/threshold", file, { threshold }),
  otsu: (file) => postImage("/segmentation/otsu", file),
  morphology: (file, operation, kernel_size, iterations) =>
    postImage("/morphology/transform", file, { operation, kernel_size, iterations }),
};
