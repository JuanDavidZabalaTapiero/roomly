import pytest
from app.exceptions.user import UserEmailAlreadyExistsError
from app.schemas.user import UserCreate
from app.services.user_service import UserService


def test_create_user_saves_user_with_hashed_password(db_session):
    service = UserService(db_session)
    data = UserCreate(
        name="Test User",
        email="test@example.com",
        password="plain-password",
    )

    user = service.create(data)

    assert user.id is not None
    assert user.name == data.name
    assert user.email == data.email
    assert user.password_hash != data.password
    assert user.role.value == "user"

    saved_user = service.get_by_id(user.id)
    assert saved_user.email == data.email


def test_create_user_rejects_duplicate_email(db_session):
    service = UserService(db_session)
    data = UserCreate(
        name="First User",
        email="same@example.com",
        password="first-password",
    )
    service.create(data)

    duplicate_data = UserCreate(
        name="Second User",
        email="same@example.com",
        password="second-password",
    )

    with pytest.raises(UserEmailAlreadyExistsError):
        service.create(duplicate_data)

    users_with_email = (
        db_session.query(type(service.repository.get_by_email(data.email)))
        .filter_by(email=data.email)
        .all()
    )
    assert len(users_with_email) == 1
