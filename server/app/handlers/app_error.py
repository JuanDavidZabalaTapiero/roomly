from fastapi.responses import JSONResponse


async def app_error_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code, content={"error": exc.code, "message": exc.message}
    )
