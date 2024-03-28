export const fillSelectWithInfo = async (url) => {
    const select = document.querySelector('select');
    const response = await fetch(url);
    const data = await response.json();
    const options = data.map(item => item.nome);
    options.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.text = optionValue;
        select.appendChild(option);
    });
}