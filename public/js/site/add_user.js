$(document).ready(function() {
    validate_form_add_user('form_add_user', get_rules().nuevo_usuario, '¿Desea registrar el usuario?', '/user/add');
});
// Validate form add user: 
function validate_form_add_user(id_form, rules, message_confirm, url) {
    $(`#${id_form}`).validate({
        rules: rules,
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', message_confirm, 'question', 'Registrar', function(confirm) {
                if (confirm) {
                    load_preloader_container(id_form, 15);
                    const data = serializarForm(id_form);
                    const response = post(url, 'POST', data);
                    response.then((res) => {
                        if (res.status) {
                            show_alert('Enhorabuena!!!', res.message, 'success');
                            reset_form_by_http(id_form);
                        } else {
                            show_alert('Ops!!!', res.message, 'error');
                        }
                        stop_preloader(id_form, 100);
                    }).catch((err) => {
                        show_alert('Ops!!!', err.message, 'error');
                        stop_preloader(id_form, 100);
                    });
                }
            });
        }
    });
}