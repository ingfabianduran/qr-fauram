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

    async search_compra_by_id({request, response}) {
        const id = request.params.id || '';
        try {
            const compra = await Compra.query().where('id', id).fetch();
            const compra_json = compra.toJSON();
            // If exist's? 
            if (compra_json.length > 0) {
                const template = require('../../Template/modal');
                const { tipo_compras } = require('../../data/data');
                const html = template.create_modal_update('form_update_compra', 'Modificar Compra', compra_json[0], tipo_compras);
                response.send({ status: true, html: html });
            } else {
                response.send({ status: false, message: 'Compra no encontrada' });
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }
}

module.exports = CompraController
