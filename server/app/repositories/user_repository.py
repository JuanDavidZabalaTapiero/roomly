from app.db.models import User
from sqlalchemy import select


class UserRepository:
    def __init__(self, db):
        self.db = db

    def create(self, user):
        self.db.add(user)
        return user

    def get_by_id(self, id):
        return self.db.get(User, id)

    def get_by_email(self, email):
        stmt = select(User).where(User.email == email)
        return self.db.scalar(stmt)

    def delete(self, user):
        self.db.delete(user)
