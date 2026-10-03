from app.db.database import get_db
from app.db.models import User
from app.repositories.user_repository import UserRepository
from sqlalchemy.exc import SQLAlchemyError

db = get_db()

try:
    repository = UserRepository(db)
    user = User(name="Juan")
    repository.create(user)

    db.commit()

except SQLAlchemyError as e:
    db.rollback()
    print(e)

finally:
    db.close()
