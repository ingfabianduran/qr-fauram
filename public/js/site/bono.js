$(document).ready(function() {
    // Init plugin select2: 
    $('.select2').select2();
    // Validate if exists camera's: 
    get_cameras();
    // Post form add cliente: 
    validate_form_cliente('form_add_cliente', get_rules().cliente, '¿Desea registrar un cliente?', '/cliente/add');
    // Reset values by form add cliente: 
    reset_form_by_modal('modal_add_cliente', 'form_add_cliente');
    // Focus out by search cliente: 
    get_data_search_cliente();
});
// Event lost focus in input identificacion: 
function get_data_search_cliente() {
    const input_identificacion = document.getElementById('identificacion');
    input_identificacion.addEventListener('focusout', () => {
        const url = `/cliente/search/${input_identificacion.value}`;
        const cliente = get(url);
        cliente.then((data) => {
            if (data.cliente.length > 0) {
                set_data_cliente(data.cliente[0]);
                events_register_cliente(data.message);
            }
        }).catch((err) => {
            toastr.error(err.message);
        });
    });
}
// Validate forms:
function validate_form_cliente(id_form, rules, message_confirm, url) {
    $(`#${id_form}`).validate({
        rules: rules,
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', message_confirm, 'question', 'Registrar', function(confirm) {
                if (confirm) {
                    const data = serializarForm(id_form);
                    const response = post(url, data);
                    response.then((res) => {
                        set_data_cliente(res.cliente);
                        events_register_cliente(res.message);
                    }).catch((err) => {
                        toastr.error(err.message);
                    });                    
                }
            });
        }
    });
}
// Set info card cliente:
function set_data_cliente(data) {
    document.getElementById('buscar_cliente_identificacion').innerText = data.identificacion;
    document.getElementById('buscar_cliente_nombre').innerText = data.nombre;
    document.getElementById('buscar_cliente_apellido').innerText = data.apellido;
}

function events_register_cliente(message) {
    $('#modal_add_cliente').modal('hide');
    toastr.success(message);
    document.getElementById('container_create_bono').classList.remove('d-none');
    document.getElementById('container_info').classList.add('d-none');
}