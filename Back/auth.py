from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from typing import Optional
from config import SECRET_KEY, ALGORITHM

from models.models import User
from db.dependencies import get_db

SECRET_KEY = SECRET_KEY
ALGORITHM = ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Crea un token de acceso JWT firmado con la clave secreta.

    Esta función toma los datos proporcionados, los codifica en un JWT y les asigna una fecha de expiración. 
    Si no se proporciona una fecha de expiración, se utiliza un valor predeterminado.

    Args:
        data (dict): Los datos que se incluirán en el payload del token.
        expires_delta (Optional[timedelta], optional): Tiempo adicional para la expiración del token. Si no se proporciona, 
        se utiliza el valor predeterminado de `ACCESS_TOKEN_EXPIRE_MINUTES`.

    Returns:
        str: El token de acceso codificado en formato JWT.

    Raises:
        JWTError: Si hay un problema con la codificación del token (aunque es poco probable si se usa correctamente).
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    """
    Obtiene el usuario actual a partir del token de acceso.

    Esta función valida el token JWT, extrae el ID de usuario del payload, y busca el usuario en la base de datos.
    Si el token no es válido o el usuario no existe, se lanza una excepción.

    Args:
        token (str): El token de acceso JWT que el usuario envía en la cabecera de la solicitud (por defecto, se obtiene del `oauth2_scheme`).
        db (Session): La sesión de la base de datos proporcionada por el sistema de dependencias.

    Returns:
        User: El usuario correspondiente al token proporcionado.

    Raises:
        HTTPException: Si el token no es válido, si el usuario no existe, o si hay problemas de autenticación.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception
    return user
