from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from models import TaskInDB, TaskCreate, TaskUpdate

app = FastAPI()

# Configure CORS to allow requests from your Angular frontend
origins = [
    "http://localhost:4200",  # Default Angular dev server port
    "http://127.0.0.1:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database (for simplicity)
tasks_db: Dict[int, TaskInDB] = {}
next_task_id = 1

@app.post("/tasks/", response_model=TaskInDB, status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate):
    global next_task_id
    new_task = TaskInDB(id=next_task_id, **task.dict(), completed=False)
    tasks_db[next_task_id] = new_task
    next_task_id += 1
    return new_task

@app.get("/tasks/", response_model=List[TaskInDB])
async def read_tasks():
    return list(tasks_db.values())

@app.get("/tasks/{task_id}", response_model=TaskInDB)
async def read_task(task_id: int):
    task = tasks_db.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/tasks/{task_id}", response_model=TaskInDB)
async def update_task(task_id: int, task_update: TaskUpdate):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    
    current_task_data = tasks_db[task_id].dict()
    update_data = task_update.dict(exclude_unset=True) # Only update fields that are provided
    
    updated_task_data = {**current_task_data, **update_data}
    tasks_db[task_id] = TaskInDB(**updated_task_data)
    return tasks_db[task_id]

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: int):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    del tasks_db[task_id]
    return {"message": "Task deleted successfully"}