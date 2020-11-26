'use strict'
const Bono = use('App/Models/Bono');
const Compra = use('App/Models/Compra');

const { validate } = use('Validator');
const { rules_bono, rules_bono_update } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

const moment = require('moment');
const faker = require('faker');

class BonoController {
    index({view}) {
        const data_table = {
            titulo: 'Listado de Bonos',
            id: 'tab_bonos',
            columnas: ['ID', 'Tipo', 'Quien redime', 'Saldo', 'Cliente', 'Fecha de compra']
        };
        return view.render('bonos', {data_table}); 
    }

    gestion({view}) {
        const tipo_bono = [
            { value: 'Recarga', text: 'Recarga' },
            { value: 'Regalo', text: 'Regalo' }
        ];
        return view.render('gestion_bonos', {tipo_bono});
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
        const is_valid = await validate(data_bono, rules_bono_update, messages);

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
                    bono_id: json_bono_old[0].id
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
}

module.exports = BonoController