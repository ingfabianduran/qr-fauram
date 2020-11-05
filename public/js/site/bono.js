$(document).ready(function() {
    // Init plugin select2: 
    $('.select2').select2();
    // View loader: 
    load_preloader();
    // Validate if exists camera's: 
    get_cameras();
    // Post form add cliente: 
    validate_form('form_add_cliente', get_rules().cliente, '¿Desea registrar un cliente?', null, null, null);
    // Reset values by form add cliente: 
    reset_form_by_modal('modal_add_cliente', 'form_add_cliente');
    // Post add bono:
    validate_form('form_add_bono', get_rules().bono, '¿Desea registrar un bono?', null, null, null);
    // Post recargar bono: 
    validate_form('form_recargar_bono', get_rules().bono_recargar, '¿Desea recargar el bono?', null, null, null);
});