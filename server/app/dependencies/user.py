from app.db.database import get_db
from app.services.user_service import UserService
from fastapi import Depends


def get_user_service(db=Depends(get_db)):
    return UserService(db)
