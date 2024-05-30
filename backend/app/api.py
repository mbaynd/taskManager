from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://192.168.1.9:3000",  
    "http://192.168.1.10:3000",
    "*"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

todos = [
    {
      "id": "1",
      "item": "Red Stephan King's Dumay Key!"
    },
    {
      "id": "2",
      "item": "Go for Shopping"
    },
    {
      "id": "3",
      "item": "Work out"
    },
    {
      "id": "4",
      "item": "Cook diner"
    },
    {
      "id": "5",
      "item": "Go to Sport"
    }
]

@app.get("/")
async def index():
    return "Hello World again!"

@app.get("/todos", tags=["Todos Tasks"])
async def get_todos():
    return {
        "data": todos
    }


@app.post("/add", tags=["Todos Tasks"])
async def add_todo(todo: dict):
    todos.append(todo)
    return {
        "result":"New item added successfully"
    }


@app.post("/addd", tags=["Todos Tasks"])
async def add_todo(item: str):
    new_todo = {"id": str(len(todos) + 1), 'item': item}
    todos.append(new_todo)

    return {
        "result":"New item added successfully"
    }

@app.delete("/delete", tags=["Todos Tasks"])
async def delete_todo(todo: dict):
    return { 
        "todo": todo
    }

@app.put("/update",tags=["Todos Tasks"])
async def update_todo(id: int, new_todo: dict):
    return {
        "id" : id,
        "new_todo": new_todo
    }