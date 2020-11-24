'use strict'
const Cliente = use('App/Models/Cliente');

const { validate } = use('Validator');
const { rules_cliente } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

class ClienteController {
    async search_cliente({request, response}) {
        const identificacion = request.params.ident || 0;
        try {
            const cliente = await Cliente.query().where('identificacion', identificacion).fetch();
            const json_cliente = cliente.toJSON();
            // If exist: 
            if (json_cliente.length > 0) {
                response.send({ status: true, message: 'Cliente encontrado y registrado', cliente: json_cliente }); 
            } else {
                response.send({ status: false, message: 'Cliente no encontrado' }); 
            }
        } catch (error) {
            response.send({ status: true, message: `Error: ${error.code}`, cliente: cliente });
        }
    }

    async add_cliente({request, response}) {
        const data_cliente = request.post();
        const is_valid = await validate(data_cliente, rules_cliente, messages);
        if (!is_valid.fails()) {
            try {
                const cliente = await Cliente.create(data_cliente);
                const json_cliente = cliente.toJSON();
                response.send({ status: true, message: 'Cliente registrado correctamente', cliente: json_cliente });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }
}

module.exports = ClienteController
