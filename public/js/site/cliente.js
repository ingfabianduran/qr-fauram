$(document).ready(function() {
    const columns = [
        { data: 'identificacion' },
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'contacto' },
    ];

    create_data_tables('tab_clientes', columns, '/cliente/list');
});