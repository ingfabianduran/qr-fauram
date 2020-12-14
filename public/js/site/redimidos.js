$(document).ready(function() {
    data_table_redimido();
    view_delete_confirm('tab_redimidos', 'form_delete_redimido', get_rules().delete, '/redimir/delete/');
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
        { 
            data: null,
            render: (item) => {
                return `${item.nombre_quien_redime}`;
            }
        },
        { 
            data: null, 
            render: (item) => { 
                return create_buttons_gestion(item);
              } 
        },
    ];
    create_data_tables('tab_redimidos', columns, '/redimir/list');
}