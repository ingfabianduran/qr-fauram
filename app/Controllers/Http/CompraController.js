'use strict'

const Compra = use('App/Models/Bono'); 

class CompraController {
    index({view}) {
        const data_table = {
            titulo: 'Listado de compras',
            id: 'tab_clientes',
            columnas: ['Tipo de compra', 'Valor', 'Cliente', 'Fecha']
        }
        return view.render('bonos', {data_table});
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
