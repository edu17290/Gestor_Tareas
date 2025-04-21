from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.dependencies import get_db  
from models.models import Task
from schemas.tasks import *

task_router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@task_router.get("/", response_model=list[TaskResponse])
def get_all_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks

@task_router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, user_id: int, db: Session = Depends(get_db)):
    new_task = Task(**task.model_dump(), user_id=user_id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task