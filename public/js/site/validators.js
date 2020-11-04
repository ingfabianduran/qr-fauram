// Validate forms:
function validate_form(id_form, rules, message_confirm, data, url, redirect) {
    $(`#${id_form}`).validate({
        rules: rules,
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', message_confirm, 'question', 'Registrar', function(confirm) {
                if (confirm) {
                    // post(url, data, redirect, id_form);                    
                }
            });
        }
    });
}