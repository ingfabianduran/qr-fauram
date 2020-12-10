$(document).ready(function() {
    validate_form_sesion('form_session', get_rules().user, '/user/login');
});
// Validate form sesion:
function validate_form_sesion(id_form, rules, url) {
    $(`#${id_form}`).validate({
        rules: rules,
        submitHandler: function() {
            const data = serializarForm(id_form);
            const response = post(url, 'POST', data);
            response.then((res) => {
                if (res.status) {
                    toastr.success(res.message);
                    setTimeout(() => {
                        location.href = '/bono/gestion';
                    }, 1500);
                } else {
                    toastr.error(res.message);
                }
            });
        }
    });
}