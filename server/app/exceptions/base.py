class AppError(Exception):
    default_message = "Ocurrió un error inesperado."
    status_code = 400
    code = "APPLICATION_ERROR"

    def __init__(self, message=None):
        message = message or self.default_message
        super().__init__(message)

        self.message = message
