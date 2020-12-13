// Http post and put: 
async function post(url, type, body, id_form) {
    const response = await fetch(url, {
        method: type, 
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': $(`#${id_form} :input[name='_csrf']`)
        },
        body: JSON.stringify(body)
    }); 
    if (!response.ok) {
        const message = `Ha ocurrido un error: ${response.status}`;
        throw new Error(message); 
    }
    const data = await response.json();
    return data;
}
// Http get and delete:
async function get(url, type) {
    const response = await fetch(url, {
        method: type
    });
    if (!response.ok) {
        const message = `Ha ocurrido un error: ${response.status}`;
        throw new Error(message); 
    }
    const data = await response.json();
    return data;
}