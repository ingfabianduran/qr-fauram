$(document).ready(function() {
    data_table_cliente();
    view_delete_confirm('tab_clientes', 'Desea eliminar un Cliente', '/cliente/delete/');
});
// Create table by cliente: 
function data_table_cliente() {
    const columns = [
        { data: 'identificacion' },
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'contacto' },
        { 
            data: null, 
            render: (item) => { 
                return create_buttons_gestion(item);
              } 
        },
    ];
    create_data_tables('tab_clientes', columns, '/cliente/list');
}