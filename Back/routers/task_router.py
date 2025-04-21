from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.dependencies import get_db  
from models.models import Task
from schemas.tasks import TaskResponse

task_router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@task_router.get("/", response_model=list[TaskResponse])
def get_all_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks