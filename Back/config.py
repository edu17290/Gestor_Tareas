from dotenv import load_dotenv
import os

load_dotenv()

# URL de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL")

# Clave secreta para JWT
SECRET_KEY = os.getenv("SECRET_KEY")

# Modo de desarrollo (True o False)
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
