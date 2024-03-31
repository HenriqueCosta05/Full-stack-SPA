export async function handleFormSubmit(method, url, data) {
    if (!url) {
        throw new Error(`URL not found for method: ${method}`);
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
    if (url.includes('register')) {
        localStorage.setItem('userId', responseData.id);
    }
    if (url.includes('login')) {
        localStorage.setItem('userId', responseData);
    }
    return responseData;
}
