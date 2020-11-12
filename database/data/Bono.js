const DATA_BONO = {
    generar_bono(tipo_bono, contenido, id) {
        const faker = require('faker');
        let bono = {
            tipo: tipo_bono,
            contenido: contenido,
            saldo: faker.random.number({min: 10000, max: 99999}),
            correo: faker.internet.email(),
            cliente_id: id
        };

        if (tipo_bono === 'Regalo') bono.quien_redime = faker.name.findName();
        else bono.quien_redime = null;

        return bono;
    }
};

module.exports = DATA_BONO;