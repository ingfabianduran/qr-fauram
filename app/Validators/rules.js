const rules = {
    rules_cliente: {
        identificacion: 'required|integer|unique:clientes',
        nombre: 'required|min:3|max:60',
        apellido: 'required|min:3|max:60',
        contacto: 'min:10|max:10',
        correo: 'email|max:45'
    }
};

module.exports = rules;