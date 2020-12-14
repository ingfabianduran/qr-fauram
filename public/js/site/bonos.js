$(document).ready(function() {
    data_table_bono();
    view_delete_confirm('tab_bonos', 'form_delete_bono', get_rules().delete, '/bono/delete/');
    view_update_modal('tab_bonos', '/bono/search/update/');
    print_bono_pdf('tab_bonos');
});
// Create table by bono: 
function data_table_bono() {
    const columns = [
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
                return (item.cliente_id === null) ? 'No Registra' : item.clientes.identificacion;
            } 
        },
        {
            data: null,
            render: (item) => {
                return (item.cliente_id === null) ? 'No Registra' : `${item.clientes.nombre} ${item.clientes.apellido}`;
            }
        },
        { 
            data: null, 
            render: (item) => { 
                return `<div class="text-center">
                            <button data-id="${item.id}" type="button" class="btn btn-dark"><i class="fa fa-file-pdf"></i>  Print PDF</button>
                            <button data-id="${item.id}" type="button" class="btn btn-info"><i class="fa fa-pen"></i>  Update</button>
                            <button data-id="${item.id}" type="button" class="btn btn-danger"><i class="fa fa-trash-alt"></i>  Delete</button>
                        </div>`;
            } 
        },
    ];
    create_data_tables('tab_bonos', columns, '/bono/list');
}