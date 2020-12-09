const DATA_USER = {
    async generar_users(n_users) {
        const faker = require('faker');
        const User = use('App/Models/User');
        faker.locale = 'es_MX';
        for (let index = 0; index < n_users; index ++) {
            const user_data = {
                nombre: faker.name.firstName(),
                apellido: faker.name.lastName(),
                rol: faker.random.arrayElement(['admin', 'standard']),
                is_active: faker.random.boolean(),
                email: faker.internet.email(),
                password: `Lenovo2020`,
                password_confirmation: `Lenovo2020`
            };
            const user = await User.create(user_data);
        }
    }
};

module.exports = DATA_USER;