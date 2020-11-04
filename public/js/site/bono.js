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
});

$('#tipo_bono').on('select2:select', function (e) { 
    const tipo_bono = e.params.data.text;
    if (tipo_bono === 'Recarga') {
        const rules = get_rules().bono;
        validate_form('form_add_bono', rules, '¿Desea registrar un bono recarga?', null, null, null);
    } else if (tipo_bono === 'Regalo') {
        const rules = get_rules().bono;
        validate_form('form_add_bono', rules, '¿Desea registrar un bono regalo?', null, null, null);
    }  
});