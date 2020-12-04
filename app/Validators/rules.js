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
        saldo: 'required|number',
        quien_redime: 'required_when:tipo,Regalo',
        correo: 'email|max:45'
    },
    rules_bono_update_saldo: {
        id_bono: 'required|integer',
        tipo_bono: 'required|in:Recarga',
        valor_recarga: 'required|integer'
    },
    rules_bono_redimir: {
        identificacion: 'required|integer',
        contacto: 'integer',
        valor: 'required|number',
        bono_id: 'required|integer'
    }, 
    rules_update_cliente: {
        id: 'required|integer',
        identificacion: 'required|integer|unique:clientes',
        nombre: 'required|min:3|max:60',
        apellido: 'required|min:3|max:60',
        contacto: 'min:10|max:10',
        correo: 'email|max:45'
    },
    rules_update_bono: {
        id: 'required|integer',
        contenido: 'required|unique:bonos',
        cliente_id: 'required|integer',
        tipo: 'required|in:Regalo,Recarga',
        saldo: 'required|number',
        quien_redime: 'required_when:tipo,Regalo',
        correo: 'email|max:45'
    },
    rules_update_redimir: {
        id: 'required|integer',
        identificacion: 'required|integer',
        valor: 'required|integer',
        contacto: 'integer',
        bono_id: 'required|integer'
    },
    rules_update_compra: {
        id: 'required|integer',
        tipo: 'required|in:Regalo,Recarga,Recarga valor',
        valor: 'required|number',
        cliente_id: 'required|integer'
    }
};

module.exports = rules;