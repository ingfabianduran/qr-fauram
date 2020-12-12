'use strict'

const Compra = use('App/Models/Compra');

const { validate } = use('Validator');
const { rules_update_compra } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

class CompraController {
    async index({view, auth}) {
        const data_table = {
            titulo: 'Listado de compras',
            id: 'tab_compras',
            columnas: ['Tipo de compra', 'Valor', 'Cliente', 'Fecha', 'Gestión']
        }
        const user = await auth.getUser();
        const json_user = user.toJSON();
        const { tipo_compras } = require('../../data/data');
        return view.render('compras', {data_table: data_table, title: 'Listado de Compras', user: json_user, tipo_compras: tipo_compras});
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
                const { update_compra } = require('../../Json/rules');
                response.send({ status: true, data: compra_json[0], form: { id: 'form_update_compra', rules: update_compra, confirm: 'Esta seguro de actualizar la Compra', url: '/compra/update' } });
            } else {
                response.send({ status: false, message: 'Compra no encontrada' });
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async update_compra({request, response}) {
        const data = request.post();
        const is_valid = await validate(data, rules_update_compra, messages);

        if (!is_valid.fails()) {
            try {
                const json = require('../../Json/json'); 
                const update_data = json.set_update_json(data);
                const update_cliente = await Compra.query().where('id', data.id).update(update_data);   
                response.send({ status: true, message: 'Compra actualizado correctamente', table: 'tab_compras' });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }
}

module.exports = CompraController
