from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class Product(BaseModel):
    nome: str
    preco: float

@app.get("/produtos")
async def list_products() -> list[Product]:
    with open('../db.json', 'r') as db:
        data = json.load(db)
        product_list = data['products']
        return product_list

@app.post('/produtos/novo-produto')
def create_product(product_data: dict) -> dict:
    with open('../db.json', 'r+') as db:
        data = json.load(db)
        for existing_product in data['products']: 
            if existing_product['nome'] == product_data['nome']:
                return {"message": "O produto já foi registrado!"}
        new_product_id = len(data['products']) + 1
        product_data['id'] = new_product_id
        data['products'].append(product_data)
        db.seek(0)
        json.dump(data, db, indent=4)
        db.truncate()
    return product_data