# 📋 Roomly

Aplicación web para la gestión y reserva de salas.

---

# ⚙️ Tecnologías

- **DB:** PostgreSQL
- **Frontend:** React
- **Backend:** FastAPI

---

# ⚛️ React

Carpeta `client`.

Instalar dependencias:

```bash
npm install
```

Iniciar servidor de desarrollo:

```bash
npm run dev
```

---

# 🐍 FastAPI

Carpeta `server`.

Crear y activar el entorno virtual:

```bash
python -m venv .venv
.venv\Scripts\activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

## Variables de entorno

Crear un archivo `.env` en `server`:

```env
DATABASE_URL=postgresql+psycopg://user:password@host:port/db_name
```

## Migraciones

Crear una base de datos PostgreSQL localmente o mediante Docker.

Aplicar las migraciones:

```bash
alembic upgrade head
```

> La base de datos debe estar activa antes de ejecutar las migraciones.

## Ejecutar backend

Iniciar el servidor de desarrollo:

```bash
uvicorn app.main:app --reload
```

## Documentación

La documentación interactiva de Swagger está disponible en:

http://127.0.0.1:8000/docs
