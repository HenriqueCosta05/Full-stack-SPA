export const getFormName = () => {
    const form = document.querySelector('form');
    const formName = form.getAttribute('name');
    return formName;
}
