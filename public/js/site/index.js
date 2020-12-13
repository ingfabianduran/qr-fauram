$(document).ready(function() {
    validate_form_sesion('form_session', get_rules().user, '/user/login');
});
// Validate form sesion:
function validate_form_sesion(id_form, rules, url) {
    $(`#${id_form}`).validate({
        rules: rules,
        submitHandler: function() {
            const data = serializarForm(id_form);
            const response = post(url, 'POST', data, id_form);
            load_preloader_container(id_form, 20);
            response.then((res) => {
                if (res.status) {
                    stop_preloader(id_form, 500);
                    toastr.success(res.message);
                    setTimeout(() => {
                        location.href = '/bono/gestion';
                    }, 1500);
                } else {
                    stop_preloader(id_form, 500);
                    toastr.error(res.message);
                }
            });
        }
    });
}