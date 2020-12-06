'use strict'

const User = use('App/Models/User');

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
        const user = { nombre: '', apellido: '', rol: '', is_active: '', email: '', password: '' };
        const html = template.create_modal_update('form_new_user', 'Nuevo Usuario', user, tipo_roles);
        response.send({html: html});
    }
}

module.exports = UserController
