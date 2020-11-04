// Http post: 
function post(url, data, redirect, container) {
    fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .then((data) => {
        stop_preloader(container, 100);
        if (data.status) {
            show_alert('Enhorabuena!!!', data.message, 'success', redirect, null);
        } else {
            show_alert('Ops!!!', data.message, 'error', null, container);
        }
    });
}