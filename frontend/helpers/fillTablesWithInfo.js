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