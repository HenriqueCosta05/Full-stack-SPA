import { handleFormSubmit } from "./handleForm.js";

export const fillSelectWithInfo = async (url) => {
    const select = document.querySelector('select');
    const response = await fetch(url);
    const data = await response.json();
    const options = data.map(item => item.nome);
    options.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.text = optionValue;
        option.className = 'form-control-option'
        select.appendChild(option);
    });
}

export const fillTablesWithInfo = async (url) => {
    const table = document.querySelector('table');
    const response = await fetch(url);
    const data = await response.json();
    const tableHeaders = Object.keys(data[0]);
    const tableHeadersHTML = tableHeaders.map(header => `<th>${header}</th>`).join('');
    const tableRowsHTML = data.map(row => {
        const rowValues = Object.values(row);
        return `<tr>${rowValues.map(value => `<td>${value}</td>`).join('')}</tr>`;
    }).join('');
    table.innerHTML = `<thead><tr>${tableHeadersHTML}</tr></thead><tbody>${tableRowsHTML}</tbody>`;
}

export const fillCardWithPrice = () => {
    const card = document.getElementById('subtotal');
}

export function completeForm() {
    const userId = localStorage.getItem('userId');
    const select = document.getElementById('form-select');
    const form = document.getElementById('orderForm');
    const button = document.getElementById('proximo');

    if (select && button) {
        const products = {};
        button.addEventListener('click', () => {
            form.innerHTML = '';
            for (let key in products) {
                delete products[key];
            }
            const selectedOptions = Array.from(select.selectedOptions);
            selectedOptions.forEach(option => {
                const label = document.createElement('label');
                label.for = option.value;
                label.className = 'form-label';
                label.innerText = option.text;

                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control';
                input.placeholder = 'Quantidade: ';
                input.name = option.value;

                form.appendChild(label);
                form.appendChild(input);

                products[option.text] = input;
            });

            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'd-flex justify-content-center m-auto mt-3';

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.className = 'btn btn-primary';
            submitButton.innerText = 'Finalizar Pedido';

            buttonDiv.appendChild(submitButton);
            form.appendChild(buttonDiv);
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            for (let key in products) {
                products[key] = parseInt(products[key].value);
            }

            let data = { products }
            console.log(data);
            handleFormSubmit('POST', `http://localhost:8004/pedido/${userId}/add`, data);
            alert('Pedido realizado com sucesso!');
            form.remove();
            const finalParagraph = document.createElement('p');
            finalParagraph.className = 'text-center';
            finalParagraph.innerText = 'Pedido realizado com sucesso! Caso queira, recarregue a página e faça um novo pedido.';
            document.getElementById('app').appendChild(finalParagraph);
        });
    }
}
