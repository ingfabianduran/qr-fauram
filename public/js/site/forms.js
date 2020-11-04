// Reset any form's: 
function reset_form_by_modal(modal, form) {
    if (modal === null || modal === '') {
        $(`#${form} :button.btn.btn-danger`).click(function(){
            $(`#${form} .invalid-feedback`).remove()
            $(`#${form} input`).removeClass('is-valid');
            $(`#${form} input`).removeClass('is-invalid');
            document.getElementById(form).reset();
            $(`#${form} .select2`).val(null).trigger('change');
        });
    } else {
        $(`#${modal}`).on('hidden.bs.modal', function (e) {
            $(`#${form} .invalid-feedback`).remove()
            $(`#${form} input`).removeClass('is-valid');
            $(`#${form} input`).removeClass('is-invalid');
            document.getElementById(form).reset();
            $(`#${form} .select2`).val(null).trigger('change');
        });
    }
}