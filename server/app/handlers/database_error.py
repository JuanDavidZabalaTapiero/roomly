from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError, OperationalError


async def sqlalchemy_error_handler(request, exc):
    if isinstance(exc, OperationalError):
        status_code = 503
        error = "DATABASE_UNAVAILABLE"
        message = "No se pudo conectar con la base de datos"

    elif isinstance(exc, IntegrityError):
        status_code = 409
        error = "DATABASE_INTEGRITY_ERROR"
        message = "No se pudo completar la operación debido a una restricción de datos"

    else:
        status_code = 500
        error = "DATABASE_ERROR"
        message = "Ocurrió un error al interactuar con la base de datos"

    return JSONResponse(
        status_code=status_code,
        content={
            "error": error,
            "message": message,
        },
    )
