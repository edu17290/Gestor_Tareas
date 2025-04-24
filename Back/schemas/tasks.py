from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional
from models.enums import PriorityEnum

class TaskBase(BaseModel):
    """
    Esquema base para las tareas.

    Este esquema es utilizado como base para la creación, respuesta y actualización de tareas.
    Incluye los campos comunes como el título, la descripción, la fecha de vencimiento, el estado
    de la tarea, la prioridad y la categoría. Los campos 'due_date', 'completed' y 'category' son opcionales.

    Attributes:
        title (str): Título de la tarea (requerido).
        description (Optional[str]): Descripción de la tarea (opcional).
        due_date (Optional[datetime]): Fecha y hora límite para completar la tarea (opcional).
        completed (Optional[bool]): Indica si la tarea está completada o no (opcional, por defecto es False).
        priority (PriorityEnum): Prioridad de la tarea (requerido).
        category (Optional[str]): Categoría de la tarea (opcional).
    """
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    completed: Optional[bool] = False
    priority: PriorityEnum
    category: Optional[str] = None

    # @field_validator("due_date")
    # def validate_due_date(cls, value):
    #     if value and value < datetime.now():
    #         raise ValueError("La fecha de vencimiento no puede estar en el pasado.")
    #     return value

class TaskCreate(TaskBase):
    """Campos obligatorios a futuro"""
    pass  

class TaskResponse(TaskBase):
    """
    Esquema para la respuesta de una tarea.

    Este esquema es utilizado al devolver información sobre una tarea específica desde la API.
    Hereda de `TaskBase` y añade los campos adicionales `id`, `created_at` y `updated_at` 
    que son generados automáticamente por la base de datos.

    Attributes:
        id (int): Identificador único de la tarea.
        title (str): Título de la tarea.
        description (Optional[str]): Descripción de la tarea.
        due_date (Optional[datetime]): Fecha y hora límite para completar la tarea.
        completed (Optional[bool]): Indica si la tarea está completada o no.
        priority (PriorityEnum): Prioridad de la tarea.
        category (Optional[str]): Categoría de la tarea.
        created_at (Optional[datetime]): Fecha de creación de la tarea.
        updated_at (Optional[datetime]): Fecha de la última actualización de la tarea.
    """
    id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        """Configuraciones adicionales para el modelo Pydantic."""
        orm_mode = True