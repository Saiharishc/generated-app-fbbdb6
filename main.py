import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Serve static files from the frontend build directory
if os.path.isdir("frontend/build"):
    app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")

@app.get("/api/items")
def get_items():
    # Placeholder for actual data retrieval logic
    return [
        {"id": 1, "question": "What is a GAN?", "answer": "A Generative Adversarial Network (GAN) is a type of machine learning framework that uses two neural networks ..."},
        {"id": 2, "question": "Explain the concept of attention in transformers.", "answer": "Attention mechanisms allow transformer models to weigh the importance of different parts of the input sequence ..."}
    ]

# Serve the frontend index.html for any non-API routes if frontend is built
if os.path.isdir("frontend/build"):
    @app.get("/{path:path}")
    async def read_index(path: str):
        from fastapi.responses import FileResponse
        return FileResponse("frontend/build/index.html")
