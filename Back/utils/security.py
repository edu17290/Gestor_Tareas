from passlib.context import CryptContext

# Contexto de encriptación de contraseñas utilizando bcrypt.
# Esta configuración se utiliza para el hashing y verificación de contraseñas.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """
    Encripta una contraseña utilizando el algoritmo bcrypt.

    Esta función toma una contraseña en texto plano y la encripta usando el algoritmo bcrypt,
    devolviendo la contraseña encriptada como un hash.

    Args:
        password (str): La contraseña en texto plano a encriptar.

    Returns:
        str: La contraseña encriptada (hash) generada por bcrypt.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña en texto plano coincide con un hash de contraseña encriptada.

    Esta función compara la contraseña en texto plano proporcionada con el hash almacenado
    para verificar si ambas coinciden.

    Args:
        plain_password (str): La contraseña en texto plano a verificar.
        hashed_password (str): El hash de la contraseña que se almacenó.

    Returns:
        bool: `True` si la contraseña en texto plano coincide con el hash, `False` en caso contrario.
    """
    return pwd_context.verify(plain_password, hashed_password)
