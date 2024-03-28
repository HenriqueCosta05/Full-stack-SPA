import { routes } from "./routes.js";
import { handleFormAction } from "./helpers/handleFormAction.js";
import { handleSubmit } from "./helpers/handleSubmit.js";
import { fillTablesWithInfo } from "./helpers/fillTablesWithInfo.js";
import { fillSelectWithInfo } from "./helpers/fillSelectWithInfo.js";

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

    if (location === "login" || location == "register") handleSubmit(location, "POST");
    
    document.querySelectorAll('form').forEach((form) => {
        form.action = handleFormAction(userId, route.port);
    });
    document.querySelectorAll('table').forEach(() => {
        if (userId !== undefined || userId !== null){
            fillTablesWithInfo(`http://localhost:8002/produtos`);
            fillTablesWithInfo(`http://localhost:8003/carrinho/${userId}`)
            fillTablesWithInfo(`http://localhost:8004/pedidos`)
        }
    });

    document.querySelectorAll('select').forEach(() => {
        fillSelectWithInfo(`http://localhost:8002/produtos`)
    })
    
}

window.addEventListener('hashchange', locationHandler);