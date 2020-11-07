const DATA_REDIMIDOS = {
    async generar_redimidos(bono, cliente) {
        if (bono.tipo === 'Regalo') {
            // Lib's:
            const faker = require('faker');
            faker.locale = 'es_MX';
            // Model's:
            const Redimido = use('App/Models/Redimido');
            const data_redimido = {
                identificacion: faker.random.number({min: 1000000000, max: 9999999999}),
                nombre_completo: faker.name.findName(),
                valor: faker.random.number({min: 1000, max: bono.saldo}),
                contacto: faker.phone.phoneNumberFormat(),
                bono_id: bono.id
            };
            const redimido = await Redimido.create(data_redimido);
        } else {
            // Lib's:
            const faker = require('faker');
            faker.locale = 'es_MX';
            // Model's:
            const Redimido = use('App/Models/Redimido');
            const data_redimido = {
                identificacion: cliente.identificacion,
                nombre_completo: `${cliente.nombre} ${cliente.apellido}`,
                valor: faker.random.number({min: 1000, max: bono.saldo}),
                contacto: cliente.contacto,
                bono_id: bono.id
            };
            const redimido = await Redimido.create(data_redimido);
        }
    },
};

module.exports = DATA_REDIMIDOS;