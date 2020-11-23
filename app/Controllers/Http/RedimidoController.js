'use strict'

const Redimir = use('App/Models/Redimido');

const { validate } = use('Validator');
const { rules_bono_redimir } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

const BonoController = require('./BonoController');

class RedimidoController {
    async redimir_bono({request, response}) {
        const data_redimido = request.post(); 
        const is_valid = await validate(data_redimido, rules_bono_redimir, messages); 
        if (!is_valid.fails()) {
            try {
                const redimir = await Redimir.create(data_redimido);
                const bono = new BonoController();
                response.send({ status: true, message: 'Bono redimido correctamente' });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }
}

module.exports = RedimidoController
