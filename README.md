# 📋 Roomly

Aplicación web para la gestión y reserva de salas.

## ⚙️ Tecnologías

- **Base de datos:** PostgreSQL
- **Frontend:** React
- **Backend:** FastAPI

---

## ⚛️ Frontend (React)

Trabajar desde el directorio `client/`.

### 📦 Instalar dependencias

Desde la raíz del proyecto, entrar en `client/` e instalar las dependencias:

```powershell
cd client
npm install
```

### ⚙️ Configurar variables de entorno

Crear `client/.env` con la URL de la API:

```env
VITE_API_URL=http://127.0.0.1:8000
```

### 🚀 Iniciar el servidor de desarrollo

Desde `client/`, iniciar Vite:

```bash
npm run dev
```

Vite estará disponible en [http://localhost:5173](http://localhost:5173).

---

## 🐍 Backend (FastAPI)

Trabajar desde el directorio `server/`.

### 📦 Crear entorno e instalar dependencias

Desde la raíz del proyecto, entrar en `server/`, crear un entorno virtual, activarlo e instalar las dependencias:

```powershell
cd server
python -m venv .venv
.\.venv\Scripts\activate
python -m pip install -r requirements.txt
```

### ⚙️ Configurar variables de entorno

Crear `server/.env` con las URL de las bases de datos y la clave secreta:

```env
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/roomly
TEST_DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/roomly_test
SECRET_KEY=una-clave-secreta-larga-y-aleatoria
```

### 🗃️ Crear la base de datos y aplicar migraciones

Crear la base de datos `roomly` en PostgreSQL. Desde `server/`, aplicar las migraciones:

```bash
alembic upgrade head
```

### 🚀 Iniciar FastAPI

Desde `server/`, iniciar la API:

```bash
uvicorn app.main:app --reload
```

La documentación interactiva está disponible en [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

## 🔐 Autenticación

El login devuelve un JWT válido durante 30 minutos. Las rutas protegidas esperan el token como Bearer.

- Registro: `POST /api/users/`
- Inicio de sesión: `POST /api/users/login`
- Usuario autenticado: `GET /api/users/me`

## 🧪 Pruebas del backend

Las pruebas usan una base separada llamada `roomly_test`. Crear esta base en PostgreSQL y configurar `TEST_DATABASE_URL` en `server/.env`. **No usar la base de desarrollo para ejecutar las pruebas.**

Desde `server/`, aplicar las migraciones a la base de pruebas. En PowerShell:

```powershell
$env:DATABASE_URL = "postgresql+psycopg://user:password@localhost:5432/roomly_test"
alembic upgrade head
Remove-Item Env:DATABASE_URL
```

Luego, ejecutar las pruebas desde `server/`:

```bash
python -m pytest -v
```

---

## 🐳 Docker

### Iniciar servicios

Desde la raíz del proyecto, iniciar PostgreSQL, pgAdmin y la API:

```bash
docker compose up -d --build
```

### Servicios

#### 🐘 Postgres

Motor de PostgreSQL.

**Valores predeterminados:**

- **User:** `postgres`
- **Password:** `postgres`
- **Base de datos creada al iniciar:** `roomly_db`
- **Guarda los datos en:** `/var/lib/postgresql/data` (volumen `postgres_data`)

#### 🖥️ pgAdmin

Gestor visual para PostgreSQL.

**Valores predeterminados:**

- **URL:** [http://localhost:5050](http://localhost:5050)
- **Email:** `admin@example.com`
- **Password:** `admin`

Al abrir pgAdmin, agregar un nuevo servidor con los datos del motor de PostgreSQL:

- **Name:** `Roomly local`
- **Host name/address:** `postgres`
- **Port:** `5432`
- **Maintenance database:** `postgres` (no es necesario cambiarla a `roomly_db`; `compose.yaml` crea esa base por separado)
- **Username:** `postgres`
- **Password:** `postgres`

> Asegurar que estos valores coincidan con los configurados en `compose.yaml`.

#### ⚡ API (FastAPI)

El servicio construye la imagen desde `server/Dockerfile` y publica la API en [http://localhost:8000/docs](http://localhost:8000/docs).

**Valores predeterminados:**

- **DATABASE_URL:** `postgresql+psycopg://postgres:postgres@postgres:5432/roomly_db`
- **SECRET_KEY:** `cambia-esto-por-una-clave-larga-y-aleatoria`

Una vez iniciado el servicio y disponible PostgreSQL con la base creada, aplicar las migraciones desde la raíz del proyecto:

```bash
docker compose run --rm api alembic upgrade head
```

La red entre servicios se crea automáticamente. Por eso la API y pgAdmin usan `postgres` como host para conectarse a la base.

Detener los servicios sin borrar los datos:

```bash
docker compose down
```

Eliminar también el volumen y los datos de PostgreSQL:

```bash
docker compose down -v
```
