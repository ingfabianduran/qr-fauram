'use strict'
const Bono = use('App/Models/Bono');
const Compra = use('App/Models/Compra');
const Mail = use('Mail')

const { validate } = use('Validator');
const { rules_bono, rules_bono_update_saldo, rules_update_bono, rules_delete } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

const moment = require('moment');
const faker = require('faker');

class BonoController {
    async index({view, auth}) {
        const data_table = {
            titulo: 'Listado de Bonos',
            id: 'tab_bonos',
            columnas: ['Tipo', 'Quien redime', 'Saldo', 'Identificación', 'Nombre Cliente', 'Gestión'],
        };
        const user = await auth.getUser();
        const json_user = user.toJSON();
        const { tipo_bonos } = require('../../data/data'); 
        return view.render('bonos', {data_table: data_table, title: 'Listado de Bonos', user: json_user, tipo_bonos: tipo_bonos}); 
    }

    async gestion({view, auth}) {
        const { tipo_bonos } = require('../../data/data');
        const user = await auth.getUser();
        const json_user = user.toJSON();
        return view.render('gestion_bonos', {tipo_bonos, title: 'Gestión de Bonos', user: json_user});
    }

    async validate_bono({request, response}) {
        let data_bono = request.post();
        const is_valid = await validate(data_bono, rules_bono, messages);
        if (!is_valid.fails()) {
            try {
                const bono = await this.add_bono(data_bono);
                const qr = await this.create_qr(bono.contenido);
                // Add compra Regalo or Recarga:
                const data_compra = {
                    tipo: bono.tipo,
                    valor: bono.saldo,
                    cliente_id: bono.cliente_id,
                };
                const compra = await Compra.create(data_compra);
                response.send({ status: true, message: 'Bono registrado correctamente', data: { bono: bono, qr: qr } });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });    
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async add_bono(bono) {
        const data_bono = {
            tipo: bono.tipo,
            contenido: `${bono.cliente_id}-${moment().format()}-${faker.random.number()}`,
            saldo: bono.saldo,
            quien_redime: bono.quien_redime,
            correo: bono.correo,
            cliente_id: bono.cliente_id
        }
        try {
            const new_bono = await Bono.create(data_bono);
            const json_bono = new_bono.toJSON();
            return json_bono
        } catch (error) {
            console.log(error);
        }
    }

    async create_qr(contenido) {
        try {
            const qr_code = require('qrcode');
            const qr = await qr_code.toDataURL(contenido);
            return qr;
        } catch (error) {
            console.log(error);
        }
    }

    async search_bono({request, response}) {
        const content_bono = request.params.content || '';
        try {
            const bono = await Bono.query().where('contenido', content_bono).fetch();
            const bono_json = bono.toJSON();
            
            // If exist's? 
            if (bono_json.length > 0) {
                response.send({ status: true, message: 'Bono encontrado con exito', bono: bono_json });
            } else {
                response.send({ status: false, message: 'Bono no encontrado' });
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async get_info_by_pdf({request, response}) {
        const data_bono = request.params.id; 
        try {
            const bono = await Bono.query().with('clientes').where({ 'id': data_bono }).fetch();
            const json_bono = bono.toJSON();
            const qr = await this.create_qr(json_bono[0].contenido);
            response.send({ status: true, message: 'PDF generado correctamente', data: { bono: json_bono, qr: qr } });
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` }); 
        }
    }

    async recargar_bono({request, response}) {
        const data_bono = request.post();
        const is_valid = await validate(data_bono, rules_bono_update_saldo, messages);

        if (!is_valid.fails()) {
            try {
                const old_bono = await Bono.query().where('id', data_bono.id_bono).fetch();
                const json_bono_old = old_bono.toJSON();
                // New saldo: 
                const new_saldo_bono = parseInt(json_bono_old[0].saldo) + parseInt(data_bono.valor_recarga);
                const new_bono = await Bono.query().where('id', data_bono.id_bono).update({'saldo': new_saldo_bono});
                // Add compra: 
                const data_compra = {
                    tipo: 'Recarga valor',
                    valor: data_bono.valor_recarga,
                    cliente_id: json_bono_old[0].cliente_id,
                };
                const compra = await Compra.create(data_compra);
                response.send({ status: true, message: 'Bono cargado correctamente' });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });   
        }
    }

    async search_bono_by_redimir({request, response}) {
        const content_bono = request.params.content || '';
        
        try {
            const bono = await Bono.query().with('clientes').where({ 'contenido': content_bono }).fetch();
            const json_bono = bono.toJSON();
            if (json_bono.length > 0) {
                const qr = await this.create_qr(json_bono[0].contenido);
                response.send({ status: true, bono: json_bono, qr: qr });
            } else {
                response.send({ status: false, message: 'Bono no encontrado'});
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` });
        }
    }

    async list_bonos({response}) {
        try {
            const bonos = await Bono.query().with('clientes').fetch();
            const json_bonos = bonos.toJSON();
            response.send({ data: json_bonos });
        } catch (error) {
            response.send({ status: false, message: `Error: ${error.code}` });
        }
    }

    async search_bono_by_id({request, response}) {
        const id = request.params.id || '';
        try {
            const bono = await Bono.query().where('id', id).fetch();
            const bono_json = bono.toJSON();
            // If exist's? 
            if (bono_json.length > 0) {
                const { update_bono } = require('../../Json/rules');
                response.send({ status: true, data: bono_json[0], form: { id: 'form_update_bono', rules: update_bono, confirm: 'Esta seguro de actualizar el Bono', url: '/bono/update' } });
            } else {
                response.send({ status: false, message: 'Bono no encontrado' });
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async update_bono({request, response}) {
        const data = request.post();
        const is_valid = await validate(data, rules_update_bono, messages);

        if (!is_valid.fails()) {
            try {
                const json = require('../../Json/json'); 
                const update_data = json.set_update_json(data);
                const update_bono = await Bono.query().where('id', data.id).update(update_data);   
                response.send({ status: true, message: 'Bono actualizado correctamente', table: 'tab_bonos' });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async delete_bono({request, response}) {
        const data = request.post();
        const is_valid = await validate(data, rules_delete, messages);

        if (!is_valid.fails()) {
            try {
                const delete_bono = await Bono.query().where('id', data.id_delete).delete();
                response.send({ status: true, message: 'Bono eliminado correctamente', table: 'tab_bonos' });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async send_email_bono({request, response}) {
        const file = request.file('file', { types: ['pdf'], size: '1mb' });
        const data_email = request.post();
        const Helpers = use('Helpers');
        // Upload and move to the server: 
        await file.move(Helpers.tmpPath(), {
            name: 'bono.pdf',
            overwrite: true
        });
        // Validate if file is move: 
        if (file.moved()) {
            try {
                const bono = await Bono.query().with('clientes').where({ 'id': data_email.id }).fetch();
                const json_bono = bono.toJSON();
                // If exist: 
                if (json_bono.length === 1) {
                    const data = json_bono[0];
                    await Mail.send('components.email', {data}, (message) => {
                        message
                            .to(`${data_email.correo}`)
                            .from('test.duran.a@gmail.com')
                            .subject(`Bono de ${data.tipo}`)
                            .attach(Helpers.tmpPath('bono.pdf'))
                    });
                    response.send({ status: true, message: 'El bono ha sido enviado correctamente' });
                } else {
                    response.send({ status: false, message: 'El bono no existe en el sistema' });
                }
            } catch (error) {
                response.send({ status: false, message: `Error: ${error.code}` });
            }
        } else {
            response.send({ status: false, message: profilePic.error() });
        }
    }
}

module.exports = BonoController