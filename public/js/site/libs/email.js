// Call http by set info form: 
function create_info_email(id_bono) {
    const url = `/bono/print/${id_bono}`;
    const response = get(url, 'GET');
    load_preloader_container('form_send_email', 15);
    response.then((res) => {
        document.getElementById('id_bono_correo').value = res.data.bono[0].id;
        document.getElementById('correo_confirmado').value = res.data.bono[0].correo;
        $('#modal_send_email').modal('show');
        stop_preloader('form_send_email', 1000);
        send_mail();
    }).catch((err) => {
        stop_preloader('form_send_email', 1000);
        show_alert('Ops!!!', err.message, 'error');
    });
}
// Validate form by send mail: 
function send_mail() {
    $('#form_send_email').validate({
        rules: get_rules().send_email,
        ignore: '',
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', 'De enviar el correo???', 'question', 'Enviar', (confirm) => {
                if (confirm) {
                    const id = document.getElementById('id_bono_correo');
                    const correo = document.getElementById('correo_confirmado');
                    const file = document.getElementById('file');

                    const formData = new FormData();
                    formData.append('_csrf', $(`#form_send_email :input[name='_csrf']`).val());
                    formData.append('id', id.value);
                    formData.append('correo', correo.value);
                    formData.append('file', file.files[0]);
                    
                    const response = uploadFile('/bono/email', 'POST', formData, 'form_send_email');
                    load_preloader_container('form_send_email', 15);
                    response.then((res) => {
                        stop_preloader('form_send_email', 1000);
                        if (res.status) {
                            $('#modal_send_email').modal('hide');
                            show_alert('Enhorabuena!!!', res.message, 'success');
                        } else {
                            show_alert('Ops!!!', res.message, 'error');
                        }
                    }).catch((err) => {
                        stop_preloader('form_send_email', 1000);
                        show_alert('Ops!!!', err.message, 'error');
                    });
                }
            });
        }
    });
}