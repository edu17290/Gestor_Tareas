from fastapi import FastAPI
from routers import task_router, user_router

app = FastAPI()

# Routers
app.include_router(task_router.task_router)
app.include_router(user_router.user_router)

# uvicorn main:app --reload
# fastapi dev main.py