import { routes } from "./routes.js";
import { handleSubmit } from "./helpers/handleSubmit.js";
import { getFormName } from "./helpers/getFormName.js";

const locationHandler = async () => {
    let location = window.location.hash.replace('#', '');
    
    //Verifica se há alguma rota já exibida em tela:
    if (location === '') {
        location = 'home';
    }
    //Muda a rota de acordo com o hash da URL:
    const route = routes[location] || routes['home'];
    const response = await fetch(route.template).then((response) => response.text());
    document.getElementById('app').innerHTML = response;

        if (getFormName() === 'getProdutos') {
            handleSubmit(location, "GET");
        }
    handleSubmit(location, "POST");
    
    document.querySelectorAll('table').forEach(() => {
        fillTablesWithInfo(`http://localhost:8002/produtos`);
    });
    
}

window.addEventListener('hashchange', locationHandler);