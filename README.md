# 📋 Roomly

Aplicación web para la gestión y reserva de salas.

## ⚙️ Tecnologías

- **Base de datos:** PostgreSQL
- **Frontend:** React
- **Backend:** FastAPI

## ⚛️ Frontend (React)

Desde `client/`, instala las dependencias:

```bash
npm install
```

Crea `client/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

## 🐍 Backend (FastAPI)

Desde `server/`, crea y activa un entorno virtual e instala las dependencias:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Crea `server/.env` con la URL de tu base de datos y una clave secreta:

```env
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/roomly
TEST_DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/roomly_test
SECRET_KEY=una-clave-secreta-larga-y-aleatoria
```

Crea la base de datos `roomly` en PostgreSQL y aplica las migraciones:

```bash
alembic upgrade head
```

Inicia FastAPI:

```bash
uvicorn app.main:app --reload
```

La documentación interactiva está disponible en [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

## 🔐 Autenticación

El registro y el login están disponibles mediante estos endpoints. El login devuelve un JWT válido durante 30 minutos; las rutas protegidas esperan el token como Bearer.

- Registro: `POST /api/users/`
- Inicio de sesión: `POST /api/users/login`
- Usuario autenticado: `GET /api/users/me`

## 🧪 Pruebas del backend

Las pruebas usan una base de datos separada llamada `roomly_test`. Créala en PostgreSQL y configura `TEST_DATABASE_URL` en `server/.env`. **No uses la base de datos de desarrollo para ejecutar las pruebas.**

Desde `server/`, aplica las migraciones a la base de pruebas. En PowerShell:

```powershell
$env:DATABASE_URL = "postgresql+psycopg://user:password@localhost:5432/roomly_test"
alembic upgrade head
Remove-Item Env:DATABASE_URL
```

Luego ejecuta los tests:

```bash
python -m pytest -v
```
