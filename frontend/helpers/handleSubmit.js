export const handleSubmit = (location, method) => {
    let userId = localStorage.getItem('userId');
    const form = document.querySelector('form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            if (value !== "submit") {
                data[key] = value;
                console.log(data);
                console.log(userId)
            }
        });
        const json = JSON.stringify(data);
        let url;
        switch (location) {
            case 'login':
                url = `http://localhost:8001/login`;
                break;
            case 'register':
                url = `http://localhost:8001/register`;
                break;
            case 'produto':
                url = method === "POST" ? `http://localhost:8002/produtos/novo-produto` : `http://localhost:8002/produtos`;
                break;
            case 'carrinho': 
                userId = localStorage.getItem('userId');
                url = `http://localhost:8003/carrinho/${userId}/add`;
                break;
            case 'pedido':
                userId = localStorage.getItem('userId');
                url = method === "POST" ? `http://localhost:8004/pedido/${userId}/add` : `http://localhost:8004/pedidos/`;
                break;
            default:
                throw new Error(`Rota não encontrada: ${location}`);
        }
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: json,
        });
        const responseData = await response.json();
        if (location === 'login' || location === 'register') {
            responseData ? localStorage.setItem('userId', responseData) : console.log('Usuário não encontrado');
        }
        return responseData;
    }
}