// Http post: 
async function post(url, type, body) {
    const response = await fetch(url, {
        method: type, 
        headers: {
            'Content-Type': 'application/json'
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
// Http get:
async function get(url) {
    const response = await fetch(url);
    if (!response.ok) {
        const message = `Ha ocurrido un error: ${response.status}`;
        throw new Error(message); 
    }
    const data = await response.json();
    return data;
}