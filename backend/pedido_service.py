from fastapi import FastAPI, HTTPException
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

class Order(BaseModel):
   products: list

@app.post("/pedido/{user_id}/add")
async def criar_pedido(user_id: int, order_data: Order) -> dict:
    with open('../db.json', 'r+') as db:
        data = json.load(db)
        
        user_exists = False
        for user in data['users']:
            if user['id'] == user_id:
                user_exists = True
                user_username = user['username']  
                break
        
        if not user_exists:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        new_order_id = len(data['orders']) + 1
        
        # Cria um dicionário para representar a ordem de compra
        order_dict = {
            "id": new_order_id,
            "products": order_data.products,
            "user_associated": user_username 
        }
        
        data['orders'].append(order_dict)
        
        db.seek(0)
        json.dump(data, db, indent=4)
        db.truncate()
        
    return {"message": "Pedido criado com sucesso", "order_id": new_order_id}

@app.get("/pedidos/{user_id}")
def listar_pedidos(user_id: int) -> dict:
    with open('../db.json', 'r') as db:
        data = json.load(db)
        for user in data['users']:
            if user['id'] == user_id:
                return {"orders": [order for order in data['orders'] if order['user_associated'] == user['username']]}
        raise HTTPException(status_code=404, detail="Usuário não encontrado")