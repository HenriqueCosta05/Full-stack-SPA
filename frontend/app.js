import { routes } from "./routes.js";
import { handleFormAction, handleFormSubmit } from "./helpers/handleForm.js";
import { fillTablesWithInfo, fillSelectWithInfo } from "./helpers/fillWithInfo.js";

const locationHandler = async () => {
    let location = window.location.hash.replace('#', '');
    let userId = localStorage.getItem('userId');
    //Verifica se há alguma rota já exibida em tela:
    if (location === '') {
        location = 'home';
    }
    //Muda a rota de acordo com o hash da URL:
    const route = routes[location];
    const response = await fetch(route.template).then((response) => response.text());
    document.getElementById('app').innerHTML = response;

    document.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const url = await handleFormAction(form.method, route.port - 8000, data);
            handleFormSubmit(form, url);
        });
    });

    document.querySelectorAll('select').forEach((select) => {
        fillSelectWithInfo('http://localhost:8002/produtos').then((response) => {
            response.forEach((produto) => {
                const option = document.createElement('option');
                option.value = produto.id;
                option.text = produto.nome;
                select.appendChild(option);
            });
        })
    });

    document.getElementById('btn-consulta').addEventListener('click', function () {
        this.addEventListener('click', async (event) => {
            event.preventDefault();
            const url = 'http://localhost:8002/produtos';
            const table = await fillTablesWithInfo(url);
            return table;
        });
    });
}

window.addEventListener('hashchange', locationHandler);