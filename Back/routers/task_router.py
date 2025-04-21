from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.dependencies import get_db
from models.models import Task
from schemas.tasks import *
from models.models import User
from auth import get_current_user

task_router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@task_router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Crear una tarea para el usuario autenticado"""
    db_task = Task(**task.model_dump(), user_id=current_user.id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@task_router.get("/", response_model=list[TaskResponse])
def get_user_tasks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Obtener las tareas del usuario autenticado"""
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    if not tasks:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="No se encontraron tareas")
    return tasks
