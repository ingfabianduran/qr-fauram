// Create data table: 
function create_data_tables(id_table, colums, url) {
    load_preloader_container(id_table, 15);
    $(`#${id_table}`).DataTable({
        ajax: url,
        dataSrc: 'data',
        columns: colums,
    });
    stop_preloader(id_table, 1000);
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
                load_preloader_container('modal_update', 10);
                document.getElementById('modal_update_content').innerHTML = data.html;
                $('#modal_update').modal('show');
                stop_preloader('modal_update', 1000);
            } else {
                toastr.info(data.message);
            }
        }).catch((err) => {
            toastr.error(err.message);
        });
    });
}