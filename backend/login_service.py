from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json

app = FastAPI()

class User(BaseModel):
    username: str
    password: str

@app.post("/register")
def register(user_data: dict) -> dict:
    with open("./db.json", "r+") as db:
        data = json.load(db)
        for existing_user in data['users']: 
            if existing_user['username'] == user_data['username']:
                return {"message": "O usuário já existe!"}
        new_user_id = len(data['users']) + 1
        user_data['id'] = new_user_id
        user_data['cart'] = []
        data['users'].append(user_data)
        db.seek(0)
        json.dump(data, db, indent=4)
        db.truncate()
    return user_data

@app.post("/login")
async def login(user: User):
    with open("./db.json", "r+") as db:
        data = json.load(db)
        for db_user in data["users"]:
            if db_user["username"] == user.username and db_user["password"] == user.password:
                return {"message": "Login successful", "user_id": db_user["id"]}
        raise HTTPException(status_code=401, detail="Credenciais inválidas")