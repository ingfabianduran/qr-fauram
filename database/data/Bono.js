const DATA_BONO = {
    generar_bono(tipo_bono, contenido, id) {
        const faker = require('faker');
        const bono = {
            tipo: tipo_bono,
            contenido: contenido,
            saldo: faker.random.number({min: 10000, max: 99999}),
            cliente_id: id
        };
        return bono;
    }
};

module.exports = DATA_BONO;