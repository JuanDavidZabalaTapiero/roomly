from app.core.security import create_access_token
from app.dependencies.user import get_user_service
from app.schemas.user import (
    TokenResponse,
    UserCreate,
    UserLogin,
    UserResponse,
    UserUpdate,
)
from fastapi import APIRouter, Depends, status

router = APIRouter(prefix="/api/users")


@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, service=Depends(get_user_service)):
    user = service.authenticate(data.email, data.password)
    return {"access_token": create_access_token(user.id), "token_type": "bearer"}


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create(data: UserCreate, service=Depends(get_user_service)):
    return service.create(data)


@router.get("/{user_id}", response_model=UserResponse)
def get(user_id: int, service=Depends(get_user_service)):
    return service.get_by_id(user_id)


@router.put("/{user_id}", response_model=UserResponse)
def update(user_id: int, data: UserUpdate, service=Depends(get_user_service)):
    return service.update(user_id, data)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(user_id: int, service=Depends(get_user_service)):
    service.delete(user_id)
