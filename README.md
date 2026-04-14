# Image Lab

Hybrid image processing app with a React frontend and a FastAPI + OpenCV backend.

## Structure

- `frontend/`: Vite + React control surface with upload, tabs, and before/after preview.
- `backend/`: FastAPI API with modular route/service separation for image operations.

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Production-style worker example:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:8000`.

## Implemented Modules

- Intensity: gamma correction, negative transformation
- Histogram: equalization, adaptive equalization
- Filtering: blur, sharpen, edge detection
- Segmentation: binary threshold, Otsu thresholding
- Morphology: erode, dilate, open, close
