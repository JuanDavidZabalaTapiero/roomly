from datetime import UTC, datetime, timedelta

import jwt
from config import ALGORITHM, SECRET_KEY
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()


def hash_password(password):
    return password_hash.hash(password)


def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def create_access_token(user_id):
    expires_at = datetime.now(UTC) + timedelta(minutes=30)
    payload = {"sub": str(user_id), "exp": expires_at}

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
