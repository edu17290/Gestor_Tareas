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

@task_router.get("/", response_model=list[TaskResponse])
def get_user_tasks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Obtener las tareas del usuario autenticado.

    Args:
        db (Session): Sesión de base de datos proporcionada por el sistema de dependencias.
        current_user (User): El usuario autenticado, obtenido mediante dependencias.

    Returns:
        list: Una lista de tareas asociadas al usuario autenticado.
    """
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    # if not tasks:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
    #                         detail="No se encontraron tareas")
    return tasks

@task_router.get("/{task_id}", response_model=TaskResponse)
def get_task_by_id(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Obtener una tarea específica del usuario autenticado.

    Args:
        task_id (int): El ID de la tarea a obtener.
        db (Session): Sesión de base de datos proporcionada por el sistema de dependencias.
        current_user (User): El usuario autenticado, obtenido mediante dependencias.

    Returns:
        TaskResponse: Los detalles de la tarea solicitada.

    Raises:
        HTTPException: Si la tarea no se encuentra o si no pertenece al usuario autenticado.
    """
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada o no autorizada")
    return task

@task_router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Crear una tarea para el usuario autenticado.

    Args:
        task (TaskCreate): Los datos de la tarea a crear.
        db (Session): Sesión de base de datos proporcionada por el sistema de dependencias.
        current_user (User): El usuario autenticado, obtenido mediante dependencias.

    Returns:
        TaskResponse: La tarea recién creada.
    """
    db_task = Task(**task.model_dump(), user_id=current_user.id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@task_router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    updated_task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Actualizar una tarea del usuario autenticado.

    Args:
        task_id (int): El ID de la tarea a actualizar.
        updated_task (TaskCreate): Los datos actualizados de la tarea.
        db (Session): Sesión de base de datos proporcionada por el sistema de dependencias.
        current_user (User): El usuario autenticado, obtenido mediante dependencias.

    Returns:
        TaskResponse: Los datos actualizados de la tarea.

    Raises:
        HTTPException: Si la tarea no se encuentra o si no pertenece al usuario autenticado.
    """
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada o no autorizada")

    for key, value in updated_task.model_dump().items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return task

@task_router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Eliminar una tarea del usuario autenticado.

    Args:
        task_id (int): El ID de la tarea a eliminar.
        db (Session): Sesión de base de datos proporcionada por el sistema de dependencias.
        current_user (User): El usuario autenticado, obtenido mediante dependencias.

    Raises:
        HTTPException: Si la tarea no se encuentra o si no pertenece al usuario autenticado.
    """
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada o no autorizada")

    db.delete(task)
    db.commit()
    return
