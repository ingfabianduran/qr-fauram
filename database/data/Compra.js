const DATA_COMPRA = {
    async generar_bonos(n_registros, tipo_compra) {
        // Data: 
        const data_cliente = require('./Cliente');
        const data_bono = require('./Bono');
        // Model's:
        const Compra = use('App/Models/Compra');
        const Cliente = use('App/Models/Cliente');
        const Bono = use('App/Models/Bono');
        // Lib's:
        const moment = require('moment');
        const faker = require('faker');
        for (let index = 0; index < n_registros; index ++) {
            const cliente = await Cliente.create(data_cliente.generar_cliente());
            const contenido_bono = `${cliente.identificacion} - ${cliente.nombre} - ${cliente.apellido} - ${moment().format()} - ${faker.random.number()}`;
            const bono = await Bono.create(data_bono.generar_bono(tipo_compra, contenido_bono, cliente.id));
            const compra = await Compra.create(this.generar_compra(bono, cliente));
        }
    },

    generar_compra(bono, cliente) {
        const compra = {
            tipo: bono.tipo, 
            valor: bono.saldo,
            cliente_id: cliente.id,
            bono_id: bono.id
        };

        return compra; 
    }
};

module.exports = DATA_COMPRA;