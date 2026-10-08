import jwt
from app.db.database import get_db
from app.exceptions.user import UserNotFoundError
from app.services.user_service import UserService
from config import ALGORITHM, SECRET_KEY
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/users/login")


def get_user_service(db=Depends(get_db)):
    return UserService(db)


def get_current_user(token=Depends(oauth2_scheme), service=Depends(get_user_service)):
    unauthorized = HTTPException(
        status_code=401,
        detail="Token inválido o expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except (InvalidTokenError, KeyError, TypeError, ValueError):
        raise unauthorized

    try:
        return service.get_by_id(user_id)
    except UserNotFoundError:
        raise unauthorized
