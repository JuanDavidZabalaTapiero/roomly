from app.api.users import router as user_router
from app.exceptions.base import AppError
from app.handlers import (
    app_error_handler,
    general_exception_handler,
    sqlalchemy_error_handler,
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Error Handlers
app.add_exception_handler(AppError, app_error_handler)
app.add_exception_handler(SQLAlchemyError, sqlalchemy_error_handler)
app.add_exception_handler(Exception, general_exception_handler)

# API Endpoints
app.include_router(user_router)


@app.get("/")
def root():
    return {"message": "Hola desde FastAPI"}
