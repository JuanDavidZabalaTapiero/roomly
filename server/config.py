import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")

# Verificación de variable
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL no está configurada")
