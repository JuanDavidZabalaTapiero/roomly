import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

# Verificación de variable
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL no está configurada")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY no está configurada")
