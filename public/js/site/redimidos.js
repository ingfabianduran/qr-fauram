$(document).ready(function() {
    data_table_redimido();
    view_delete_confirm('tab_redimidos', 'Desea eliminar un Redimido', '/redimir/delete/');
    view_update_modal('tab_redimidos', '/redimir/search/update/');
});
// Create table by redimido: 
function data_table_redimido() {
    const columns = [
        { data: 'identificacion' },
        { 
            data: null, 
            render: (item) => {
                return `$ ${item.valor}`;
            } 
        },
        { data: 'created_at' },
        { data: 'bono_id' },
        { 
            data: null, 
            render: (item) => { 
                return create_buttons_gestion(item);
              } 
        },
    ];
    create_data_tables('tab_redimidos', columns, '/redimir/list');
}