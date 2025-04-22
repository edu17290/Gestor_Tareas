# 1. Importaciones estándar
from math import ceil

# 2. Importaciones de terceros
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

# 3. Importaciones locales
from db.dependencies import get_db
from auth import create_access_token
from models.models import User
from schemas.users import UserCreate, UserResponse
from utils.security import hash_password, verify_password
from schemas.users import PaginatedUsers
from schemas.users import UserUpdate

user_router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@user_router.get("/", response_model=PaginatedUsers)
def get_users_paginated(
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db)
):
    """
    Obtener usuarios con paginación

    Ejemplo de uso:
        GET /users?page=2&page_size=5
    """
    total_users = db.query(User).count()
    total_pages = ceil(total_users / page_size)

    skip = max((page - 1) * page_size, 0)

    users = db.query(User).offset(skip).limit(page_size).all()

    return {
        "total": total_users,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
        "users": users
    }

from auth import get_current_user

@user_router.get("/me", response_model=UserResponse)
def get_current_user_data(current_user: User = Depends(get_current_user)):
    """
    Obtener los datos del usuario autenticado.
    """
    return current_user

@user_router.put("/me", response_model=UserResponse)
def update_user_data(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Actualizar los datos del usuario autenticado.
    """
    if user_update.username:
        current_user.username = user_update.username
    if user_update.email:
        current_user.email = user_update.email
    if user_update.password:
        current_user.password = hash_password(user_update.password)

    db.commit()
    db.refresh(current_user)
    return current_user

@user_router.post("/login", status_code=status.HTTP_200_OK)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Inicia sesión en la aplicación y devuelve un token de acceso.

    Args:
        form_data (OAuth2PasswordRequestForm): Datos del formulario de autenticación (username y password).
        db (Session): Sesión de base de datos proporcionada por el sistema de dependencias.

    Returns:
        dict: Un diccionario con el token de acceso y el tipo de token.

    Raises:
        HTTPException: Si las credenciales son inválidas.
    """
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
        )

    access_token = access_token = create_access_token(
        data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


@user_router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Creacion de uusario"""
    existing_user = db.query(User).filter(
        (User.email == user.email) | (User.username == user.username)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email o nombre de usuario ya están registrados"
        )

    hashed_pw = hash_password(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        password=hashed_pw
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
