from pathlib import Path
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from auth import router as auth_router

app = FastAPI(
    title="Anime Lounge API",
    docs_url="/docs",
    openapi_url="/openapi.json",
    version="0.0.1",
)

# Allow local dev servers (Vite default or custom 8080)
origins = [
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes - prefix with /api to avoid conflicts with frontend routes
app.include_router(auth_router.router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return {"message": "Anime Lounge API in FastAPI"}


# --- Frontend Static Files & SPA Catch-All ---
DIST_DIR = Path(__file__).resolve().parent / "dist"
ASSETS_DIR = DIST_DIR / "assets"

if ASSETS_DIR.exists():
    app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")


@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Exclude API endpoints, Swagger docs, and schema
    if full_path.startswith(("api", "docs", "openapi.json")):
        raise HTTPException(status_code=404, detail="Not Found")

    # Serve specific static files if they exist (e.g., favicon.ico, vite.svg)
    file_path = DIST_DIR / full_path
    if full_path and file_path.is_file():
        return FileResponse(file_path)

    # Fallback to index.html for client-side routing
    index_file = DIST_DIR / "index.html"
    if index_file.is_file():
        return FileResponse(index_file)

    raise HTTPException(
        status_code=404,
        detail="Frontend build not found. Run 'npm run build' inside the frontend project first.",
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)