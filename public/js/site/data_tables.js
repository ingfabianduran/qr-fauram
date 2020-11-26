function create_data_tables(id_table, colums, url) {
    $(`#${id_table}`).DataTable({
        ajax: url,
        dataSrc: 'data',
        columns: colums,
    });
}