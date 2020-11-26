'use strict'

const Redimir = use('App/Models/Redimido');
const Bono = use('App/Models/Bono');

const { validate } = use('Validator');
const { rules_bono_redimir } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

class RedimidoController {
    index({view}) {
        const data_table = {
            titulo: 'Listado de redimidos',
            
        }; 
    }

    async redimir_bono({request, response}) {
        const data_redimido = request.post(); 
        const is_valid = await validate(data_redimido, rules_bono_redimir, messages); 
        if (!is_valid.fails()) {
            try {
                // Valid if bono have saldo: 
                let bono = await Bono.query().where('id', data_redimido.bono_id).fetch();
                const json_bono = bono.toJSON();
                if (parseInt(json_bono[0].saldo) > parseInt(data_redimido.valor)) {
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
}

module.exports = RedimidoController
