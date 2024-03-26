from fastapi import FastAPI, HTTPException
from typing import Dict, Any
from pydantic import BaseModel
import json

app = FastAPI()

cart = {}

class Cart(BaseModel):
    produto_id: int
    quantidade: int

@app.post("/carrinho/{user_id}/add")
async def add_item_carrinho(user_id: int, cart: Cart) -> Dict[str, Any]:
    produto_id = cart.produto_id
    quantidade = cart.quantidade
    # Verifica se o usuário existe
    with open('./db.json', 'r') as db:
        data = json.load(db)
        user_exists = False
        for user in data['users']:
            if user['id'] == user_id:
                user_exists = True
                current_user = user
                break
        if not user_exists:
            raise HTTPException(status_code=404, detail=f'Usuário não encontrado com o id: {user_id}')
    
    # Verifica se o produto existe e, caso exista, adiciona o produto ao carrinho
    with open('./db.json', 'r+') as db:
        data = json.load(db)
        for product in data['products']: 
            if product['id'] == produto_id:
                product_description = {
                    "id": produto_id,
                    "nome": product['nome'],
                    "quantidade": quantidade,
                    "preço total": product['preco'] * quantidade
                }
                break
        else:
            raise HTTPException(status_code=404, detail=f'Produto não encontrado com o id: {produto_id}')

    # Adiciona o produto ao carrinho do usuário
    current_user['cart'].append(product_description)

   # Atualiza os dados do usuário no arquivo db.json
    for user in data['users']:
        if user['id'] == user_id:
            user['cart'] = current_user['cart']
            break

    with open('./db.json', 'w') as db:
        json.dump(data, db, indent=4)

    return current_user