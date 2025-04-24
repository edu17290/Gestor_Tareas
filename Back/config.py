from dotenv import load_dotenv
import os

load_dotenv()

# DATABASE
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", 3306)  
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

# Clave secreta para JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# Modo de desarrollo (True o False)
DEBUG = os.getenv("DEBUG", "false").lower() == "true"