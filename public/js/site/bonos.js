$(document).ready(function() {
    data_table_bono();
});
// Create table by bono: 
function data_table_bono() {
    const columns = [
        { data: 'id' },
        { data: 'tipo' },
        { 
            data: null,
            render: (item) => {
                return (item.quien_redime === null) ? 'No aplica' : item.quien_redime;
            } 
        },
        { 
            data: null,
            render: (item) => {
                return `$ ${item.saldo}`;
            } 
        },
        {
            data: null,
            render: (item) => {
                return `${item.clientes.nombre} ${item.clientes.apellido}`;
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
    create_data_tables('tab_bonos', columns, '/bono/list');
}