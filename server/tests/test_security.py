from app.core.security import hash_password, verify_password


def test_hash_password_does_not_return_plain_password():
    password = "example-password"
    hashed_password = hash_password(password)

    assert hashed_password != password


def test_verify_password_accepts_correct_password():
    password = "example-password"
    hashed_password = hash_password(password)

    assert verify_password(password, hashed_password)


def test_verify_password_rejects_incorrect_password():
    hashed_password = hash_password("correct-password")

    assert not verify_password("wrong-password", hashed_password)
