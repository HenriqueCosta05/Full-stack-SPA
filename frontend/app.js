import { routes } from "./routes.js";
const locationHandler = async () => {
    let location = window.location.hash.replace('#', '');
    
    //Verifica se há alguma rota já exibida em tela:
    if (location === '') {
        location = 'home';
    }
    //Muda a rota de acordo com o hash da URL:
    const route = routes[location] || routes['login'];
    const response = await fetch(route.template).then((response) => response.text());
    document.getElementById('app').innerHTML = response;
}

window.addEventListener('hashchange', locationHandler);