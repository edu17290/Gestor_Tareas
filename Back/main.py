from fastapi import FastAPI
from routers import task_router, user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # 👈 Permite todos los orígenes
    allow_credentials=True,   # ⚠️ OJO: esto no funciona con allow_origins="*" en producción
    allow_methods=["*"],      # Permite todos los métodos: GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],      # Permite cualquier header
)

# Routers
app.include_router(task_router.task_router)
app.include_router(user_router.user_router)

# uvicorn main:app --reload
# fastapi dev main.py