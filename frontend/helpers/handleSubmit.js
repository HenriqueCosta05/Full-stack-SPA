export const handleSubmit = (location, method) => {
    const form = document.querySelector('form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            if (value !== "submit") {
                data[key] = value;
            }
        });
        const json = JSON.stringify(data);
        let url;
        let userId; 
        switch (location) {
            case 'login':
                url = `http://localhost:8001/login`;
                break;
            case 'cadastro':
                url = `http://localhost:8001/cadastro`;
                method = "POST";
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
                throw new Error(`Unknown location: ${location}`);
        }
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: json,
        });
        if (location === 'login') {
            localStorage.removeItem('userId');
            localStorage.setItem('userId', response.userId);
        }
        return response.text();
    }
}