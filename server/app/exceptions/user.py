from .base import AppError


class UserNotFoundError(AppError):
    default_message = "Usuario no encontrado"
    status_code = 404
    code = "USER_NOT_FOUND"


class UserEmailAlreadyExistsError(AppError):
    default_message = "El email ya está registrado"
    status_code = 409
    code = "USER_EMAIL_ALREADY_EXISTS"
