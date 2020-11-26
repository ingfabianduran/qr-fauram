$(document).ready(function() {
    data_table_cliente();
});

function data_table_cliente() {
    const columns = [
        { data: 'identificacion' },
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'contacto' },
        { 
            data: null, 
            title: 'Action', 
            render: (item) => { 
                return `<div class="text-center">
                            <button type="button" class="btn btn-info"><i class="fa fa-pen"></i>  Update</button>
                            <button type="button" class="btn btn-danger"><i class="fa fa-trash-alt"></i>  Delete</button>
                        </div>`;
              } 
        },
    ];
    create_data_tables('tab_clientes', columns, '/cliente/list');
}