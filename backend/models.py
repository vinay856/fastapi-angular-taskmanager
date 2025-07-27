from pydantic import BaseModel, Field
from typing import Optional

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    completed: bool = False # Allow updating completion status

class TaskInDB(TaskBase):
    id: int
    completed: bool = False

    class Config:
        from_attributes = True # updated from orm_mode = True