$(document).ready(function() {
    // Init plugin select2: 
    $('.select2').select2();
    // Validate if exists camera's: 
    get_cameras();
    // Post form add cliente: 
    validate_form_cliente('form_add_cliente', get_rules().cliente, '¿Desea registrar un cliente?', '/cliente/add');
    // Reset values by form add cliente: 
    reset_form_by_event('modal_add_cliente', 'form_add_cliente');
    // Focus out by search cliente: 
    get_data_search_cliente();
    // Post form add bono: 
    validate_form_add_bono('form_add_bono', get_rules().bono, '¿Desea registrar el bono?', '/bono/add');
    // Put form update bono: 
    validate_form_recargar_bono('form_recargar_bono', get_rules().bono_recargar, '¿Desea recargar el bono?', '/bono/recargar');
    // Post form redimir bono: 
    validate_form_redimir_bono('form_add_redimir', get_rules().bono_redimir, '¿Desea redimir el bono?', '/bono/redimir');
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
// Validate form cliente:
function validate_form_cliente(id_form, rules, message_confirm, url) {
    $(`#${id_form}`).validate({
        rules: rules,
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', message_confirm, 'question', 'Registrar', function(confirm) {
                if (confirm) {
                    const data = serializarForm(id_form);
                    const response = post(url, 'POST', data);
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
// validate form add_bono:
function validate_form_add_bono(id_form, rules, message_confirm, url) {
    $(`#${id_form}`).validate({
        rules: rules,
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', message_confirm, 'question', 'Registrar', function(confirm) {
                if (confirm) {
                    load_preloader_container(id_form, 30);
                    const data = serializarForm(id_form);
                    const response = post(url, 'POST', data);
                    response.then((res) => {
                        stop_preloader(id_form, 1000);
                        toastr.success(res.message);
                        document.getElementById('image_qr').src = res.data.qr;
                        reset_form_by_http(id_form);
                        print_bono(res.data.bono);
                    }).catch((err) => {
                        stop_preloader(id_form, 1000);
                        toastr.error(err.message);
                    });       
                }
            });
        }
    });
}
// Print PDF by QR code: 
function print_bono(bono) {
    const bt_print_bono = document.getElementById('bt_imprimir_pdf');
    bt_print_bono.classList.remove('disabled');
    bt_print_bono.addEventListener('click', (e) => {
        show_alert_confirm('Esta seguro???', '¿Desea imprimir el bono?', 'question', 'Generar PDF', function(confirm) {
            if (confirm) {
                const url = `/bono/print/${bono.id}`;
                const info_bono = get(url); 
                info_bono.then((res) => {
                    download_pdf(res.data.bono[0].tipo, res.data, res.message);
                });
            }
        }); 
    });
}
// validate form recargar bono:
function validate_form_recargar_bono(id_form, rules, message_confirm, url) {
    $(`#${id_form}`).validate({
        rules: rules,
        ignore: '',
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', message_confirm, 'question', 'Recargar', function(confirm) {
                if (confirm) {
                    const data = serializarForm(id_form);
                    const response = post(url, 'PUT', data);
                    load_preloader_container(id_form);
                    response.then((res) => {
                        stop_preloader(id_form, 1000);
                        toastr.success(res.message);
                        reset_form_by_http(id_form);
                        document.getElementById('span_bono_id').textContent = 'No consultado';
                    }).catch((err) => {
                        stop_preloader(id_form, 1000);
                        toastr.error(err.message);
                    });
                }
            });
        }
    });
}
// Validate form redimir bono: 
function validate_form_redimir_bono(id_form, rules, message_confirm, url) {
    $(`#${id_form}`).validate({
        rules: rules,
        ignore: '',
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', message_confirm, 'question', 'Redimir', function(confirm) {
                if (confirm) {
                    
                }
            });
        }
    });
}
// Set info card cliente:
function set_data_cliente(data) {
    document.getElementById('cliente_id').value = data.id;
    document.getElementById('buscar_cliente_identificacion').innerText = data.identificacion;
    document.getElementById('buscar_cliente_nombre').innerText = data.nombre;
    document.getElementById('buscar_cliente_apellido').innerText = data.apellido;
}
// Event's when validate or register cliente: 
function events_register_cliente(message) {
    $('#modal_add_cliente').modal('hide');
    toastr.success(message);
    document.getElementById('container_create_bono').classList.remove('d-none');
    document.getElementById('container_info').classList.add('d-none');
}