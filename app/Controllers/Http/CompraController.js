'use strict'

const Compra = use('App/Models/Compra'); 

class CompraController {
    index({view}) {
        const data_table = {
            titulo: 'Listado de compras',
            id: 'tab_compras',
            columnas: ['Tipo de compra', 'Valor', 'Cliente', 'Fecha', 'Gestión']
        }
        return view.render('compras', {data_table});
    }

    async list_compras({response}) {
        try {
            const compras = await Compra.query().with('clientes').fetch();
            const json_compras = compras.toJSON();
            response.send({ data: json_compras }); 
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` });
        }
    }
}

module.exports = CompraController
