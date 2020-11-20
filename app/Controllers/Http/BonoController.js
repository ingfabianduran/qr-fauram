'use strict'
const Bono = use('App/Models/Bono');

const { validate } = use('Validator');
const { rules_bono, rules_bono_update } = require('../../Validators/rules');
const { messages } = require('../../Validators/messages');

const moment = require('moment');
const faker = require('faker');

class BonoController {
    index({view}) {
        const tipo_bono = [
            { value: 'Recarga', text: 'Recarga' },
            { value: 'Regalo', text: 'Regalo' }
        ];

        return view.render('bono', {tipo_bono});
    }

    async validate_bono({request, response}) {
        let data_bono = request.post();
        const is_valid = await validate(data_bono, rules_bono, messages);
        if (!is_valid.fails()) {
            try {
                const bono = await this.add_bono(data_bono);
                const qr = await this.create_qr(bono.contenido);
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
                response.send({ status: true, message: 'Bono no encontrado' });
            }
        } catch (error) {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });
        }
    }

    async update_valor_bono({request, response}) {
        const data_bono = request.post();
        const is_valid = await validate(data_bono, rules_bono_update, messages);

        if (!is_valid.fails()) {
            try {
                const old_bono = await Bono.query().where('id', data_bono.id_bono).fetch();
                const json_bono_old = old_bono.toJSON();
                // New saldo: 
                const new_saldo_bono = parseInt(json_bono_old[0].saldo) + parseInt(data_bono.valor_recarga);
                const new_bono = await Bono.query().where('id', data_bono.id_bono).update({'saldo': new_saldo_bono});
                response.send({ status: true, message: 'Bono cargado correctamente' });
            } catch (error) {
                response.send({ status: false, message: `Error: ${error}` });
            }
        } else {
            response.send({ status: false, message: `Error: ${is_valid.messages()[0].message}` });   
        }
    }
}

module.exports = BonoController