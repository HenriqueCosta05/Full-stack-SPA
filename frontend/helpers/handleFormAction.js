export const handleFormAction = (userId, port) => {
    const form = document.querySelector('form');
    if (form) {
        if(port === 8004) form.action = `http://localhost:${port}/pedido/${userId}/add`;
        if(port === 8003) form.action = `http://localhost:${port}/carrinho/${userId}/add`;
    }
}