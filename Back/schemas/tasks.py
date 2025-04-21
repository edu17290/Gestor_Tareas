from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional
from models.enums import PriorityEnum

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    completed: Optional[bool] = False
    priority: PriorityEnum
    category: Optional[str] = None

    @field_validator("due_date")
    def validate_due_date(cls, value):
        if value and value < datetime.now():
            raise ValueError("La fecha de vencimiento no puede estar en el pasado.")
        return value

class TaskCreate(TaskBase):
    """Campos obligatorios a futuro"""
    pass  

class TaskResponse(TaskBase):
    id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True