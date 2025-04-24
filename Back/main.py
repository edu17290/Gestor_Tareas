from fastapi import FastAPI
from routers import task_router, user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      
    allow_credentials=True,   
    allow_methods=["*"],      
    allow_headers=["*"],      
)

# Routers
app.include_router(task_router.task_router)
app.include_router(user_router.user_router)