const DATA_CLIENTE = {
    generar_cliente() {
        const faker = require('faker');
        faker.locale = 'es_MX';
        const cliente = {
            identificacion: faker.random.number({min: 1000000000, max: 9999999999}),
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            contacto: faker.phone.phoneNumberFormat(),
            correo: faker.internet.email()
        }
        return cliente;
    }
};

module.exports = DATA_CLIENTE;