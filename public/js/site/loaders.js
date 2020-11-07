// Load preloader in main_container:
function load_preloader() {
    $('#page-top').LoadingOverlay('show', {
        image: '',
        background: 'rgba(250, 250, 250, 0.6)',
        fontawesome: 'fas fa-spinner fa-spin',
        fontawesomeColor: 'rgba(33, 33, 33, 1)'
    });
    // Despues de 1 segundos:
    stop_preloader('page-top', 1000);
}
// Small container for example form, card or div col: 
function load_preloader_container(id_container, size) {
    $(`#${id_container}`).LoadingOverlay('show', {
        image: '',
        size: size,
        background: 'rgba(250, 250, 250, 0.6)',
        fontawesome: 'fas fa-spinner fa-spin',
        fontawesomeColor: 'rgba(33, 33, 33, 1)'
    });
}
// Stop loader: 
function stop_preloader(id_container, time) {
    setTimeout(function(){
        $(`#${id_container}`).LoadingOverlay('hide');
    }, time);
}