function serializarForm(id_form) {
    const form = document.getElementById(id_form);
    const form_data = new FormData(form);
    let obj = {};
    for (const key of form_data.keys()) {
        obj[key] = form_data.get(key);
    }
    return obj;
}

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