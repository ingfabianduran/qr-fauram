$(document).ready(function() {
    data_table_user(); 
    view_delete_confirm('tab_usuarios', 'Desea eliminar un Usuario', '/user/delete/');
    view_update_modal('tab_usuarios', '/user/search/update/');  
});
// Create table by user:
function data_table_user() {
    const colums = [
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'rol' },
        { 
            data: null,
            render: (item) => {
                return (item.is_active) ? 'Activo' : 'Deshabilitado';
            } 
        },
        { 
            data: null, 
            render: (item) => { 
                return create_buttons_gestion(item);
              } 
        },
    ];
    create_data_tables('tab_usuarios', colums, '/user/list', true);
}