from pydantic import BaseModel, EmailStr
from typing import Optional
from typing import List


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class PaginatedUsers(BaseModel):
    total: int
    page: int
    page_size: int
    total_pages: int
    users: List[UserResponse]

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
