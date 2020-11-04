$(document).ready(function() {
    // Init plugin select2: 
    $('.select2').select2();
    // View loader: 
    load_preloader();
    // Validate if exists camera's: 
    get_cameras();
});