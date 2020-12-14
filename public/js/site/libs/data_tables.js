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
                        location.href = '/user/add';
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
function view_delete_confirm(id_table, id_form, rules, url) {
    $(`#${id_table} tbody`).on('click', '.btn-danger', function() {
        const id = $(this).data('id');
        $('#modal_delete').modal('show');
        document.getElementById('id_delete').value = id;
        $(`#${id_form}`).validate({
            rules: rules,
            ignore: '',
            submitHandler: function() {
                const data = serializarForm(id_form);
                const response = post(url, 'DELETE', data, id_form);
                load_preloader_container(id_form, 10);
                response.then((res) => {
                    stop_preloader(id_form, 500);
                    $('#modal_delete').modal('hide');
                    if (res.status) {
                        show_alert('Enhorabuena!!!', res.message, 'success');
                        $(`#${res.table}`).DataTable().ajax.reload();
                    } else {
                        show_alert('Ops!!!', res.message, 'error');
                    }
                }).catch((err) => {
                    stop_preloader(id_form, 500);
                    show_alert('Ops!!!', err.message, 'error');
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
        response.then((res) => {
            load_preloader_container(res.form.id, 10);
            $('#modal_update').modal('show');
            set_data_in_form(res.form.id, res.data);
            stop_preloader(res.form.id, 1000);
            update_data(res.form.id, res.form.rules, res.form.confirm, res.form.url);
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
                    const response = post(url, 'PUT', data, id_form); 
                    load_preloader_container(id_form, 10); 
                    response.then((res) => {
                        stop_preloader(id_form, 500);
                        $('#modal_update').modal('hide');
                        if (res.status) {
                            show_alert('Enhorabuena!!!', res.message, 'success');
                            reset_form_by_event('modal_update', id_form);
                            $(`#${res.table}`).DataTable().ajax.reload();
                        } else {
                            show_alert('Ops!!!', res.message, 'error');
                        }
                    }).catch((err) => {
                        stop_preloader(id_form, 500);
                        show_alert('Ops!!!', err.message, 'error');
                    }); 
                }
            });
        }
    });
}
// Print bono by datatable bonos: 
function print_bono_pdf(id_table) {
    $(`#${id_table} tbody`).on('click', '.btn-dark', function() {
        const id = $(this).data('id');
        show_alert_print_bono('Esta seguro???', '¿Desea imprimir el bono?', 'question', 'Generar PDF').then((text) => {
            get_info_pdf(id).then((res) => {
                if (res.status) {
                    download_pdf(res.data.bono[0].tipo, res.data, res.message, text);
                } else {
                    toastr.error(res.message);
                }
            });
        });
    });
}
// Set data into form: 
function set_data_in_form(id_form, data) {
    const form = document.getElementById(id_form);
    const form_data = new FormData(form);
    
    for (const i in data) {
        for (const j of form_data.keys()) {
            if (i === j) {
                document.getElementById(j).value = data[i];
                break;
            }
        }
    }
}