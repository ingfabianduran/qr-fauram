'use strict'

const Redimir = use('App/Models/Redimido');
const Bono = use('App/Models/Bono');

const { validate } = use('Validator');
const { rules_bono_redimir, rules_update_redimir, rules_delete } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

class RedimidoController {
    async index({view, auth}) {
        const data_table = {
            titulo: 'Listado de redimidos',
            id: 'tab_redimidos',
            columnas: ['Documento', 'Valor', 'Fecha', 'Quien Redime', 'Gestión']
        };
        const user = await auth.getUser();
        const json_user = user.toJSON();
        return view.render('redimidos', {data_table: data_table, title: 'Listado de Redimidos', user: json_user}); 
    }

    async redimir_bono({request, response}) {
        let data_redimido = request.post(); 
        const is_valid = await validate(data_redimido, rules_bono_redimir, messages); 
        if (!is_valid.fails()) {
            try {
                const json = require('../../Json/json'); 
                data_redimido = json.set_update_json(data_redimido);
                // Valid if bono have saldo: 
                let bono = await Bono.query().where('id', data_redimido.bono_id).fetch();
                const json_bono = bono.toJSON();
                if (parseInt(json_bono[0].saldo) >= parseInt(data_redimido.valor)) {
                    const new_saldo_bono = parseInt(json_bono[0].saldo) - parseInt(data_redimido.valor);
                    bono = await Bono.query().where('id', data_redimido.bono_id).update({'saldo': new_saldo_bono});
                    // New redimir: 
                    const redimir = await Redimir.create(data_redimido);
                    response.send({ status: true, message: 'Bono redimido correctamente' });
                } else {
                    response.send({ status: false, message: 'El saldo actual del bono el insuficiente' });
                }
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async list_redimidos({response}) {
        try {
            const redimidos = await Redimir.query().with('bonos').fetch();
            const json_redimidos = redimidos.toJSON();
            response.send({ data: json_redimidos });
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` });
        }
    }

    async search_redimido_by_id({request, response}) {
        const id = request.params.id || '';
        try {
            const redimido = await Redimir.query().where('id', id).fetch();
            const redimido_json = redimido.toJSON();
            // If exist's? 
            if (redimido_json.length > 0) {
                const { update_redimir } = require('../../Json/rules');
                response.send({ status: true, data: redimido_json[0], form: { id: 'form_update_redimido', rules: update_redimir, confirm: 'Esta seguro de actualizar el Redimido', url: '/redimir/update' } });
            } else {
                response.send({ status: false, message: 'Compra no encontrada' });
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async update_redimido({request, response}) {
        const data = request.post();
        const is_valid = await validate(data, rules_update_redimir, messages);

        if (!is_valid.fails()) {
            try {
                const json = require('../../Json/json'); 
                const update_data = json.set_update_json(data);
                const update_redimir = await Redimir.query().where('id', data.id).update(update_data);   
                response.send({ status: true, message: 'Redimido actualizado correctamente', table: 'tab_redimidos' });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async delete_redimido({request, response}) {
        const data = request.post();
        const is_valid = await validate(data, rules_delete, messages);

        if (!is_valid.fails()) {
            try {
                const delete_redimido = await Redimir.query().where('id', data.id_delete).delete();
                response.send({ status: true, message: 'Redimido eliminado correctamente', table: 'tab_redimidos' });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }
}

module.exports = RedimidoController
