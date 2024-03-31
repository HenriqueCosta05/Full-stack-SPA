# Full-Stack SPA

## Descrição do projeto
Trata-se de uma simples SPA (Single Page Application), escrita em Python no back-end e  Vanilla Javascript no front-end. Com esta página, foram aplicados os seguintes conhecimentos:
* DOM (Document Object Model)
* Integração entre sistemas front-end e back-end.
* Validação do CORS (Cross Origin Resource Sharing) entre diferentes páginas web.
* Inserção de itens em um um banco de dados JSON.
* Rotas e manipulação de rotas via Javascript DOM.
* Microsserviços com FastAPI


## Como executar o projeto?
Para executar o projeto com êxito, devemos seguir a seguinte sequência de ações:

1. Clonar o repositório localmente na máquina com o comando abaixo:

```
    git clone https://github.com/HenriqueCosta05/Full-stack-SPA.git
```

2. Verificar se o python está devidamente instalado, executando o seguinte comando no terminal:

```
    python3 -v 
    
    ou
    
    python -v
```

3. Navegar no diretório `backend` e criar o ambientes virtual de desenvolvimento, aqui nomeado de `backend-services`:

```
    cd backend

    python -m venv backend-services

```

4. Salvar as dependências necessárias para o funcionamento do projeto no ambiente de desenvolvimento:
```python
    pip install fastapi uvicorn # garante que algumas dependências sejam instaladas devidamente antes de salvá-las.
    pip freeze > requirements.txt
```

5. Abrir `quatro (4)` terminais e, em cada um, ativar o ambiente virtual em cada um deles, de forma a criar quatro (4) microsserviços:

```python
    # Windows
    backend-services\Scripts\activate

    # Linux ou MacOS
    source backend-services/bin/activate
```

6. Ativar cada microsserviço (correspondente a uma linha de código abaixo) em cada um dos terminais, executando os comandos:

```python
uvicorn login_service:app --reload --port 8001
uvicorn produtos_service:app --reload --port 8002
uvicorn carrinho_service:app --reload --port 8003
uvicorn pedido_service:app --reload --port 8004
```

7. Abrir outro terminal, navegar para a pasta frontend e ativar o live-server.

```javascript
cd frontend
npx live-server //Aqui, poderá ser requerido instalar o live-server, caso seja a primeira vez que o usuário o utilize.
```

## Ideias futuras de aprimoramento do projeto
* Validação de formulários
* Tratamento de exceções
