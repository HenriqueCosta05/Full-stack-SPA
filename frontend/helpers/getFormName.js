export const getFormName = () => {
    window.onload = () => {
        const form = document.querySelector('form');
        if (form) {
            const formName = form.getAttribute('name');
            return formName;
        } else {
            console.error('Nenhum formulário encontrado');
        }
    }
}