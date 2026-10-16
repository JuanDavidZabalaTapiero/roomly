import pytest
from app.exceptions.user import UserEmailAlreadyExistsError, UserNotFoundError
from app.schemas.user import UserCreate, UserUpdate
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


def test_update_user_changes_name_and_email(db_session):
    service = UserService(db_session)
    user = service.create(
        UserCreate(
            name="Old Name",
            email="old@example.com",
            password="plain-password",
        )
    )
    data = UserUpdate(name="New Name", email="new@example.com")

    updated_user = service.update(user.id, data)

    assert updated_user.id == user.id
    assert updated_user.name == data.name
    assert updated_user.email == data.email

    saved_user = service.get_by_id(user.id)
    assert saved_user.name == data.name
    assert saved_user.email == data.email


def test_update_user_allows_keeping_same_email(db_session):
    service = UserService(db_session)
    user = service.create(
        UserCreate(
            name="Old Name",
            email="same@example.com",
            password="plain-password",
        )
    )

    updated_user = service.update(
        user.id,
        UserUpdate(name="New Name", email="same@example.com"),
    )

    assert updated_user.name == "New Name"
    assert updated_user.email == "same@example.com"


def test_update_user_rejects_duplicate_email(db_session):
    service = UserService(db_session)
    existing_user = service.create(
        UserCreate(
            name="Existing User",
            email="existing@example.com",
            password="plain-password",
        )
    )
    user_to_update = service.create(
        UserCreate(
            name="User to Update",
            email="update@example.com",
            password="plain-password",
        )
    )

    with pytest.raises(UserEmailAlreadyExistsError):
        service.update(
            user_to_update.id,
            UserUpdate(name="Updated Name", email=existing_user.email),
        )

    unchanged_user = service.get_by_id(user_to_update.id)
    assert unchanged_user.name == "User to Update"
    assert unchanged_user.email == "update@example.com"


def test_update_user_raises_when_user_does_not_exist(db_session):
    service = UserService(db_session)

    with pytest.raises(UserNotFoundError):
        service.update(
            9999,
            UserUpdate(name="Updated Name", email="updated@example.com"),
        )


def test_delete_user_removes_user(db_session):
    service = UserService(db_session)
    user = service.create(
        UserCreate(
            name="User to Delete",
            email="delete@example.com",
            password="plain-password",
        )
    )

    service.delete(user.id)

    with pytest.raises(UserNotFoundError):
        service.get_by_id(user.id)


def test_delete_user_raises_when_user_does_not_exist(db_session):
    service = UserService(db_session)

    with pytest.raises(UserNotFoundError):
        service.delete(9999)
