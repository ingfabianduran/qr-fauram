const rules = {
    rules_cliente: {
        identificacion: 'required|integer|unique:clientes',
        nombre: 'required|min:3|max:60',
        apellido: 'required|min:3|max:60',
        contacto: 'min:10|max:10',
        correo: 'email|max:45'
    },
    rules_bono: {
        cliente_id: 'required|integer',
        tipo: 'required|in:Regalo,Recarga',
        saldo: 'required|integer',
        quien_redime: 'required_when:tipo,Regalo',
        correo: 'email|max:45'
    },
    rules_bono_update: {
        id_bono: 'required|integer',
        tipo_bono: 'required|in:Recarga',
        valor_recarga: 'required|integer'
    }
};

module.exports = rules;