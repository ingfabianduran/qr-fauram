function create_data_tables(id_table, colums, url) {
    load_preloader_container(id_table, 15);
    $(`#${id_table}`).DataTable({
        ajax: url,
        dataSrc: 'data',
        columns: colums,
    });
    stop_preloader(id_table, 1000);
}

function create_buttons_gestion(item) {
    const render_button =   `<div class="text-center">
                                <button data-id="${item.id}" type="button" class="btn btn-info"><i class="fa fa-pen"></i>  Update</button>
                                <button data-id="${item.id}" type="button" class="btn btn-danger"><i class="fa fa-trash-alt"></i>  Delete</button>
                            </div>`;
    return render_button;
}