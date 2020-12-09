'use strict'

const User = use('App/Models/User');

const { validate } = use('Validator');
const { rules_user, rules_update_user } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

class UserController {
    index({view}) {
        return view.render('index');
    }

    view_users({view}) {
        const data_table = {
            titulo: 'Listado de Usuarios',
            id: 'tab_usuarios',
            columnas: ['Nombre', 'Apellido', 'Rol', 'Estado', 'Gestión']
        };
        return view.render('users', {data_table});
    }

    async list_users({response}) {
        try {
            const users = await User.query().fetch();
            const json_users = users.toJSON();
            response.send({ data: json_users });  
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` });
        }
    }

    get_template_new_user({response}) {
        const template = require('../../Template/modal');
        const { tipo_roles } = require('../../data/data');
        const { nuevo_usuario } = require('../../Template/rules');
        const user = { nombre: '', apellido: '', rol: '', email: '', password: '', password_confirmation: '', is_active: '' };
        const html = template.create_modal_update('form_new_user', 'Nuevo Usuario', user, tipo_roles);
        response.send({html: html, form: { id: 'form_new_user', rules: nuevo_usuario, confirm: 'Esta seguro de agregar un nuevo usuario', url: '/user/add' }});
    }

    async add_user({request, response}) {
        let data_user = request.post();
        data_user.is_active = (data_user.is_active === 'on') ? true : false;
        const is_valid = await validate(data_user, rules_user, messages);

        if (!is_valid.fails()) {
            try {
                const user = await User.create(data_user);
                const json_user = user.toJSON(); 
                response.send({ status: true, message: 'Usuario registrado correctamente', user: json_user });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async search_user_by_id({request, response}) {
        const id = request.params.id || 0;
        try {
            const user = await User.query().where('id', id).fetch();
            const json_user = user.toJSON();
            // If exist: 
            if (json_user.length > 0) {
                const template = require('../../Template/modal');
                const { update_usuario } = require('../../Template/rules');
                const { tipo_roles } = require('../../data/data');
                const html = template.create_modal_update('form_update_usuario', 'Modificar Usuario', json_user[0], tipo_roles);
                response.send({ status: true, html: html, form: { id: 'form_update_usuario', rules: update_usuario, confirm: 'Esta seguro de actualizar el Usuario', url: '/usuario/update' } });
            } else {
                response.send({ status: false, message: 'Usuario no encontrado' });   
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` });
        }
    }
}

module.exports = UserController
