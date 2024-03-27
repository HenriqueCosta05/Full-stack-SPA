export const handleFormAction = (userId) => {
    const form = document.querySelector('form');
    if (form) {
        form.action = "http://localhost:8003/carrinho/" + userId + "/add";
    }
}