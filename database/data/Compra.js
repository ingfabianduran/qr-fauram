const DATA_COMPRA = {
    async generar_bonos(n_registros, tipo_compra, bonos_por_cliente) {
        // Data: 
        const data_cliente = require('./Cliente');
        const data_bono = require('./Bono');
        const data_redimido = require('./Redimidos');
        // Model's:
        const Compra = use('App/Models/Compra');
        const Cliente = use('App/Models/Cliente');
        const Bono = use('App/Models/Bono');
        // Lib's:
        const moment = require('moment');
        const faker = require('faker');
        // Bonos de recarga: 
        if (bonos_por_cliente === null || bonos_por_cliente === undefined) {
            for (let index = 0; index < n_registros; index ++) {
                const cliente = await Cliente.create(data_cliente.generar_cliente());
                const contenido_bono = `${cliente.identificacion}-${cliente.nombre}-${cliente.apellido}-${moment().format()}-${faker.random.number()}`;
                const bono = await Bono.create(data_bono.generar_bono(tipo_compra, contenido_bono, cliente.id));
                const compra = await Compra.create(this.generar_compra(bono, cliente));
                await data_redimido.generar_redimidos(bono, cliente);
            }
        // Bonos de regalo: 
        } else {
            for (let i = 0; i < n_registros; i ++) {
                const cliente = await Cliente.create(data_cliente.generar_cliente());
                for (let j = 0; j < bonos_por_cliente; j ++) {
                    const contenido_bono = `${cliente.identificacion}-${cliente.nombre}-${cliente.apellido}-${moment().format()}-${faker.random.number()}`;
                    const bono = await Bono.create(data_bono.generar_bono(tipo_compra, contenido_bono, cliente.id));
                    const compra = await Compra.create(this.generar_compra(bono, cliente));
                    await data_redimido.generar_redimidos(bono, null);
                }
            }
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