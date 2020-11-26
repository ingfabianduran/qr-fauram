function create_data_tables(id_table, colums, url) {
    load_preloader_container(id_table, 15);
    $(`#${id_table}`).DataTable({
        ajax: url,
        dataSrc: 'data',
        columns: colums,
    });
    stop_preloader(id_table, 1000);
}