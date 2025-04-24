# models.py
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy import Enum as SqlEnum
from models.enums import PriorityEnum

Base = declarative_base()


class User(Base):
    """
    Representa un usuario en la base de datos.

    Esta clase define la estructura de la tabla `users` en la base de datos.

    Atributos:
        id (int): Identificador único del usuario (clave primaria).
        username (str): Nombre de usuario único (requiere ser único).
        email (str): Dirección de correo electrónico del usuario (requiere ser único).
        password (str): Contraseña del usuario (encriptada).

    Relaciones:
        tasks (List[Task]): Lista de tareas asociadas a este usuario.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(255), nullable=False, unique=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

    tasks = relationship("Task", back_populates="user",
                         cascade="all, delete-orphan")


class Task(Base):
    """
    Representa una tarea en la base de datos.

    Esta clase define la estructura de la tabla `tasks` en la base de datos.

    Atributos:
        id (int): Identificador único de la tarea (clave primaria).
        title (str): Título de la tarea (obligatorio).
        description (str): Descripción detallada de la tarea (opcional).
        due_date (datetime): Fecha límite para completar la tarea (opcional).
        completed (bool): Estado de la tarea (por defecto es `False`).
        priority (PriorityEnum): Prioridad de la tarea (valor por defecto es `PriorityEnum.media`).
        category (str): Categoría de la tarea (opcional).
        created_at (datetime): Fecha de creación de la tarea (por defecto es la fecha y hora actual).
        updated_at (datetime): Fecha de la última actualización de la tarea (actualizada automáticamente).

    Relaciones:
        user (User): Usuario propietario de la tarea.
    """
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(String(500))
    due_date = Column(DateTime)
    completed = Column(Boolean, default=False)
    priority = Column(SqlEnum(PriorityEnum), nullable=False,
                      default=PriorityEnum.media)
    category = Column(String(100))

    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc),
                        onupdate=datetime.now(timezone.utc))

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="tasks")
