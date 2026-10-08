from app.core.security import hash_password, verify_password
from app.db.models import User
from app.exceptions.user import (
    InvalidCredentialsError,
    UserEmailAlreadyExistsError,
    UserNotFoundError,
)
from app.repositories.user_repository import UserRepository


class UserService:
    def __init__(self, db):
        self.db = db
        self.repository = UserRepository(db)

    # FUNCIONES AUXILIARES
    def _get_user_or_raise(self, user_id):
        user = self.repository.get_by_id(user_id)

        # Usuario no encontrado
        if user is None:
            raise UserNotFoundError()

        return user

    def authenticate(self, email, password):
        user = self.repository.get_by_email(email)

        if user is None or not verify_password(password, user.password_hash):
            raise InvalidCredentialsError()

        return user

    # FUNCIONES CRUD
    def create(self, data):

        # Email ya registrado
        existing_user = self.repository.get_by_email(data.email)

        if existing_user:
            raise UserEmailAlreadyExistsError()

        # Registrar usuario
        user = User(
            name=data.name, email=data.email, password_hash=hash_password(data.password)
        )
        self.repository.create(user)
        self.db.commit()

        return user

    def get_by_id(self, user_id):
        return self._get_user_or_raise(user_id)

    def update(self, user_id, data):
        user = self._get_user_or_raise(user_id)

        # Intento de actualización de email
        if data.email != user.email:
            # Email ya registrado
            existing_user = self.repository.get_by_email(data.email)

            if existing_user:
                raise UserEmailAlreadyExistsError()

        # Actualizar campos
        user.name = data.name
        user.email = data.email

        self.db.commit()

        return user

    def delete(self, user_id):
        user = self._get_user_or_raise(user_id)

        self.repository.delete(user)
        self.db.commit()
