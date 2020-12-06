// Create data table: 
function create_data_tables(id_table, colums, url, add_btn) {
    if (add_btn === undefined) {
        $(`#${id_table}`).DataTable({
            ajax: url,
            dataSrc: 'data',
            columns: colums,
        });
    } else {
        $(`#${id_table}`).DataTable({
            ajax: url,
            dataSrc: 'data',
            columns: colums,
            dom: 'Bfrtip',
            buttons: [
                {
                    text: '+',
                    action: function () {
                        alert( 'Button activated' );
                    }
                }
            ]
        });
    }
}
// Create button's action's:
function create_buttons_gestion(item) {
    const render_button =   `<div class="text-center">
                                <button data-id="${item.id}" type="button" class="btn btn-info"><i class="fa fa-pen"></i>  Update</button>
                                <button data-id="${item.id}" type="button" class="btn btn-danger"><i class="fa fa-trash-alt"></i>  Delete</button>
                            </div>`;
    return render_button;
}
// Create event button delete: 
function view_delete_confirm(id_table, message, url) {
    $(`#${id_table} tbody`).on('click', '.btn-danger', function() {
        const id = $(this).data('id');
        show_alert_confirm('Esta seguro???', message, 'warning', 'Eliminar', (confirm) => {
            if (confirm) {
                const response = get(`${url}${id}`, 'DELETE');
                response.then((data) => {

                }).catch((err) => {
                    toastr.error(err.message);
                }); 
            }
        });
    });
}
// Create event by show modal update: 
function view_update_modal(id_table, url) {
    $(`#${id_table} tbody`).on('click', '.btn-info', function() {
        const id = $(this).data('id');
        const response = get(`${url}${id}`);
        response.then((data) => {
            if (data.html) {
                document.getElementById('modal_update_content').innerHTML = data.html;
                load_preloader_container(data.form.id, 10);
                $('#modal_update').modal('show');
                update_data(data.form.id, data.form.rules, data.form.confirm, data.form.url);
                stop_preloader(data.form.id, 1000);
            } else {
                toastr.info(data.message);
            }
        }).catch((err) => {
            toastr.error(err.message);
        });
    });
}
// Http update 
function update_data(id_form, rules, message_confirm, url) {
    $(`#${id_form}`).validate({
        rules: rules,
        submitHandler: function() {
            show_alert_confirm('Esta seguro???', message_confirm, 'question', 'Actualizar', (confirm) => {
                if (confirm) {
                    const data = serializarForm(id_form);
                    const response = post(url, 'PUT', data); 
                    load_preloader_container(id_form, 10); 
                    response.then((res) => {

                    }).catch((err) => {
                        stop_preloader(id_form, 1000);
                        toastr.error(err.message);
                    }); 
                }
            });
        }
    });
}