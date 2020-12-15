// Call http by send email: 
function create_email(id_bono) {
    $('#modal_send_email').modal('show');
    
    $('#form_send_email').validate({
        rules: get_rules().send_email,
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', message_confirm, 'question', 'Actualizar', (confirm) => {
                if (confirm) {
                    
                }
            });
        }
    });
}