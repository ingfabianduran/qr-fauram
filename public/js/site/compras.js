$(document).ready(function() {
    data_table_compra();
    view_delete_confirm('tab_compras', 'form_delete_compra', get_rules().delete, '/compra/delete/');
    view_update_modal('tab_compras', '/compra/search/update/');
});
// Create table by compra: 
function data_table_compra() {
    const columns = [
        { data: 'tipo' },
        { 
            data: null,
            render: (item) => {
                return `$ ${item.valor}`;
            } 
        },
        { 
            data: null,
            render: (item) => {
                return (item.cliente_id === null) ? 'No Registra' : `${item.clientes.nombre} ${item.clientes.apellido}`
            }
        },
        { data: 'created_at' },
        { 
            data: null, 
            render: (item) => { 
                return create_buttons_gestion(item);
            } 
        },
    ];
    create_data_tables('tab_compras', columns, '/compra/list');
}