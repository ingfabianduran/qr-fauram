'use strict'
const Cliente = use('App/Models/Cliente');

const { validate } = use('Validator');
const { rules_cliente } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

class ClienteController {
    index({view}) {
        const data_table = {
            titulo: 'Listado de Clientes',
            id: 'tab_clientes',
            columnas: ['Identificación', 'Nombre', 'Apellidos', 'Contacto', 'Gestión']
        };
        return view.render('clientes.edge', {data_table});
    }

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
            response.send({ status: false, message: `Error: ${error.code}` });
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

    async list_clientes({response}) {
        try {
            const clientes = await Cliente.query().fetch();
            const json_clientes = clientes.toJSON();
            response.send({ data: json_clientes });  
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` });
        }
    }

    async search_cliente_by_id({request, response}) {
        const id = request.params.id || 0;
        try {
            const cliente = await Cliente.query().where('id', id).fetch();
            const json_cliente = cliente.toJSON();
            // If exist: 
            if (json_cliente.length > 0) {
                const template = require('../../Template/modal');
                const { update_cliente } = require('../../Template/rules');
                const html = template.create_modal_update('form_update_cliente', 'Modificar Cliente', json_cliente[0]);
                response.send({ status: true, html: html, form: { id: 'form_update_cliente', rules: update_cliente, confirm: 'Esta seguro de actualizar el Cliente', url: '/cliente/update' } });
            } else {
                response.send({ status: false, message: 'Cliente no encontrado' });   
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` });
        }
    }
}

module.exports = ClienteController
