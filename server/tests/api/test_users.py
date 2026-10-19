def test_create_user_returns_created_user(client):
    response = client.post(
        "/api/users/",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "password": "plain-password",
        },
    )

    assert response.status_code == 201

    data = response.json()
    assert data["name"] == "Test User"
    assert data["email"] == "test@example.com"
    assert data["role"] == "user"
    assert "password" not in data
    assert "password_hash" not in data
