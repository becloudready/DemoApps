import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.database import connect_db, close_db
from app.routes.employees import router as employees_router
from mangum import Mangum

load_dotenv()

app = FastAPI(title="Employee Management API", version="1.0.0")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await connect_db()


@app.on_event("shutdown")
async def shutdown():
    await close_db()


@app.get("/")
async def root():
    return {"app": "Employee Management API", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(employees_router)

handler = Mangum(app, lifespan="off")
