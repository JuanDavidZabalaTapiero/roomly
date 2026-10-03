from fastapi.responses import JSONResponse


async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "error": "INTERNAL_SERVER_ERROR",
            "message": "Ocurrió un error interno en el servidor",
        },
    )
