'use strict'

const User = use('App/Models/User');

const { validate } = use('Validator');
const { rules_user, rules_update_user } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

class UserController {
    async index({view, response, auth}) {
        try {
            const user = await auth.getUser();
            response.redirect('/bono/gestion');
        } catch (error) {
            return view.render('index', {title: 'QR Fauram'});
        }
    }

    async view_users({view, auth}) {
        const data_table = {
            titulo: 'Listado de Usuarios',
            id: 'tab_usuarios',
            columnas: ['Nombre', 'Apellido', 'Rol', 'Estado', 'Gestión']
        };
        const user = await auth.getUser();
        const json_user = user.toJSON();
        const { tipo_roles } = require('../../data/data');
        return view.render('users', {data_table: data_table, title: 'Listado de Usuarios', user: json_user, tipo_roles: tipo_roles});
    }

    async view_form_new_user({view, auth}) {
        const user = await auth.getUser();
        const json_user = user.toJSON();
        const { tipo_roles } = require('../../data/data');
        return view.render('add_user', {tipo_roles: tipo_roles, user: json_user});
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

    async add_user({request, response}) {
        let data_user = request.post();
        data_user.is_active = (data_user.is_active === 'on') ? true : false;
        const is_valid = await validate(data_user, rules_user, messages);

        if (!is_valid.fails()) {
            try {
                const json = require('../../Json/json');
                data_user = json.set_update_json(data_user);
                const user = await User.create(data_user);
                response.send({ status: true, message: 'Usuario registrado correctamente', table: 'tab_usuarios' });
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
                const { update_usuario } = require('../../Json/rules');
                response.send({ status: true, data: json_user[0], form: { id: 'form_update_user', rules: update_usuario, confirm: 'Esta seguro de actualizar el Usuario', url: '/user/update' } });
            } else {
                response.send({ status: false, message: 'Usuario no encontrado' });   
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` });
        }
    }

    async update_user({request, response}) {
        let data = request.post();
        data.is_active = (data.is_active === 'on') ? true : false;
        const is_valid = await validate(data, rules_update_user, messages);

        if (!is_valid.fails()) {
            try {
                const Hash = use('Hash');
                const json = require('../../Json/json'); 
                data.password = await Hash.make(data.password);
                const update_data = json.set_update_json(data);
                const update_redimir = await User.query().where('id', data.id).update(update_data);   
                response.send({ status: true, message: 'Usuario actualizado correctamente', table: 'tab_usuarios' });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async logIn({request, response, auth}) {
        const data_user = request.post();
        
        try {
            const isValidSession = await auth.attempt(data_user.email, data_user.password);
            response.send({ status: true, message: 'Bienvenido a QR Fauram' });
        } catch (error) {
            response.send({ status: false, message: 'Usuario o contraseña incorrecta' });
        }
    }

    async logout({auth, response}) {
        await auth.logout();
        response.redirect('/');
    }
}

module.exports = UserController
