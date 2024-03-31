import { routes } from "./routes.js";
import { handleFormSubmit } from "./helpers/handleForm.js";
import { fillTablesWithInfo, completeForm } from "./helpers/fillWithInfo.js";

const locationHandler = async () => {
    let location = window.location.hash.replace('#', '');
    let username = localStorage.getItem('username');
    let userId = localStorage.getItem('userId');
    //Verifica se há alguma rota já exibida em tela:
    if (location === '') {
        location = 'home';
    }
    //Muda a rota de acordo com o hash da URL:
    const route = routes[location];
    const response = await fetch(route.template).then((response) => response.text());
    document.getElementById('app').innerHTML = response;


    async function handleElements(selector, method, url) {
        const element = document.getElementById(selector);
        const response = await fetch(url);
        const data = await response.json();

        if (element.tagName === 'FORM') {
            element.addEventListener('submit', async (event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                const data = Object.fromEntries(formData.entries());
                await handleFormSubmit(method, url, data);
            });

        } else if (element.tagName === 'SELECT') {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.text = item.nome;
                element.appendChild(option);
            });
        } else if (element.tagName === 'BUTTON') {
            element.addEventListener('click', async () => {
                const tableInfo = await fillTablesWithInfo(url);
                const table = document.createElement('table');
                table.appendChild(tableInfo);
            });
        }
    }

    // Uso dos métodos handleElements para requisições GET:
    document.addEventListener("DOMContentLoaded", handleElements('form-select', 'GET', 'http://localhost:8002/produtos'));    
    document.addEventListener("click", handleElements('btn-consulta', 'GET', 'http://localhost:8002/produtos'));
    
    //Uso do método handleElements para requisições POST:
    document.addEventListener("submit", handleElements('productForm', 'POST', 'http://localhost:8002/produtos/novo-produto'));
    document.addEventListener("submit", handleElements('form-register', 'POST', 'http://localhost:8001/register'));
    document.addEventListener("submit", handleElements('form-login', 'POST', 'http://localhost:8001/login'));

    //Caso específico
        const proximoButton = document.getElementById('proximo');
        if (proximoButton) {
            completeForm()
        }

    
}

window.addEventListener('hashchange', locationHandler);