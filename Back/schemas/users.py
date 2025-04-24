from pydantic import BaseModel, EmailStr
from typing import Optional
from typing import List


class UserBase(BaseModel):
    """
    Esquema base para el usuario.

    Este esquema contiene los campos comunes para todos los usuarios: `username` y `email`.
    Es utilizado como base para crear y responder con información básica de usuario.

    Attributes:
        username (str): Nombre de usuario (requerido).
        email (EmailStr): Dirección de correo electrónico del usuario (requerido).
    """
    username: str
    email: EmailStr


class UserCreate(UserBase):
    """
    Esquema para la creación de un nuevo usuario.

    Este esquema se utiliza para crear un nuevo usuario. Hereda de `UserBase`, añadiendo 
    el campo `password` para almacenar la contraseña del usuario en el momento de la creación.

    Attributes:
        username (str): Nombre de usuario (requerido).
        email (EmailStr): Dirección de correo electrónico del usuario (requerido).
        password (str): Contraseña del usuario (requerido).
    """
    password: str


class UserLogin(BaseModel):
    """
    Esquema para el inicio de sesión de un usuario.

    Este esquema es utilizado cuando un usuario intenta iniciar sesión en la aplicación. 
    Solo contiene los campos `username` y `password`, que son necesarios para autenticar al usuario.

    Attributes:
        username (str): Nombre de usuario (requerido).
        password (str): Contraseña del usuario (requerido).
    """
    username: str
    password: str


class UserResponse(UserBase):
    """
    Esquema para la respuesta del usuario.

    Este esquema es utilizado al devolver información detallada de un usuario desde la API. 
    Hereda de `UserBase` y añade el campo `id`, que es generado por la base de datos.

    Attributes:
        id (int): Identificador único del usuario (requerido).
        username (str): Nombre de usuario (requerido).
        email (EmailStr): Dirección de correo electrónico del usuario (requerido).
    """
    id: int

    class Config:
        """Configuración adicional para permitir que los modelos de SQLAlchemy se conviertan a Pydantic."""
        orm_mode = True

class PaginatedUsers(BaseModel):
    """
    Esquema para la paginación de usuarios.

    Este esquema es utilizado cuando se devuelve una lista de usuarios paginada desde la API. 
    Contiene los detalles de la paginación (total de usuarios, página actual, tamaño de página, etc.) 
    y una lista de usuarios en la página solicitada.

    Attributes:
        total (int): Número total de usuarios disponibles en la base de datos.
        page (int): Número de la página actual.
        page_size (int): Número de usuarios por página.
        total_pages (int): Número total de páginas.
        users (List[UserResponse]): Lista de usuarios de la página actual.
    """
    total: int
    page: int
    page_size: int
    total_pages: int
    users: List[UserResponse]

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
