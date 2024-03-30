
export async function handleFormAction(method, port, data) {
    const baseURL = 'http://localhost:800';
    const urlList = {
        post: [
            `${baseURL}${port}/register`,
            `${baseURL}${port}/login`,
            `${baseURL}${port}/produtos/novo-produto`,
            `${baseURL}${port}/carrinho/${localStorage.getItem('userId')}/add`,
            `${baseURL}${port}/pedido/${localStorage.getItem('userId')}/add`,
        ],
        get: [
            `${baseURL}${port}/produtos`,
            `${baseURL}${port}/carrinho/${localStorage.getItem('userId')}`,
            `${baseURL}${port}/pedidos/${localStorage.getItem('userId')}`,
        ]
        
    };

    const url = urlList[method][port];
    if (!url) {
        throw new Error(`URL não encontrada para o método: ${method}`);
    }

    const response = await fetch(url, {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
}

export async function handleFormSubmit(formElement, url) {
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(url, {
            method: formElement.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Houve um problema: ', error);
    }
}


