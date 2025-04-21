from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from db.dependencies import get_db
from models.models import User
from schemas.users import *
from utils.security import *

user_router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@user_router.get("/", response_model=list[UserResponse])
def get_all_tasks(db: Session = Depends(get_db)):
    tasks = db.query(User).all()
    return tasks

@user_router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Verificar si el email o username ya existe
    existing_user = db.query(User).filter((User.email == user.email) | (User.username == user.username)).first()
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
