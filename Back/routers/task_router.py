from fastapi import APIRouter, HTTPException, status
from db.models.tasks import Task

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
    responses={404: {"description": "Not found"}}
)

users_list = [
    {
        "id": "1",
        "name": "User 1",
        "email": "user1@gmail.com"
    },
    {
        "id": "2",
        "name": "User 2",
        "email": "user2@gmail.com"
    },
]

taks_list = [
    {
        "id": "1",
        "title": "Task 1",
        "description": "Description for task 1",
        "status": "pending",
        "priority": "high",
        "due_date": "2023-10-01",
        "created_at": "2023-09-01",
        "updated_at": "2023-09-02",
        "user_id": "1"
    },
    {
        "id": "2",
        "title": "Task 2",
        "description": "Description for task 2",
        "status": "completed",
        "priority": "medium",
        "due_date": "2023-10-05",
        "created_at": "2023-09-03",
        "updated_at": "2023-09-04",
        "user_id": "2"
    }
]


@router.get("/")
async def get_tasks():
    """
    Get all tasks
    """
    return taks_list


@router.get("/{task_id}")
async def get_task(task_id: str):
    """
    Get a task by ID
    """
    task = next((task for task in taks_list if task["id"] == task_id), None)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_task(task: Task):
    """
    Create a new task
    """
    task_dict = task.model_dump()
    task_dict["id"] = str(len(taks_list) + 1)
    taks_list.append(task_dict)
    return task_dict