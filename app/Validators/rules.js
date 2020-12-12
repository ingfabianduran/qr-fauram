const rules = {
    rules_cliente: {
        identificacion: 'required|integer|unique:clientes',
        nombre: 'required|min:3|max:45',
        apellido: 'required|min:3|max:45',
        contacto: 'min:10|max:10',
        correo: 'email|min:8|max:80'
    },
    rules_bono: {
        cliente_id: 'required|integer',
        tipo: 'required|in:Regalo,Recarga',
        saldo: 'required|number',
        quien_redime: 'required_when:tipo,Regalo|min:3|max:80',
        correo: 'email|min:8|max:45'
    },
    rules_bono_update_saldo: {
        id_bono: 'required|integer',
        tipo_bono: 'required|in:Recarga',
        valor_recarga: 'required|integer'
    },
    rules_bono_redimir: {
        identificacion: 'required|integer',
        nombre_quien_redime: 'required|min:8|max:80',
        contacto: 'integer',
        valor: 'required|number',
        n_factura: 'required|integer',
        bono_id: 'required|integer'
    },
    rules_user: {
        nombre: 'required|min:3|max:45',
        apellido: 'required|min:3|max:45',
        rol: 'required|in:admin,standard',
        is_active: 'boolean',
        email: 'email|min:8|max:80|unique:users',
        password: 'required|min:8|max:60|confirmed',
        password_confirmation: 'required|min:8|max:60'
    }, 
    rules_update_cliente: {
        id: 'required|integer',
        identificacion: 'required|integer',
        nombre: 'required|min:3|max:45',
        apellido: 'required|min:3|max:45',
        contacto: 'min:10|max:10',
        correo: 'email|min:8|max:45'
    },
    rules_update_bono: {
        id: 'required|integer',
        contenido: 'required',
        cliente_id: 'required|integer',
        tipo: 'required|in:Regalo,Recarga',
        saldo: 'required|number',
        quien_redime: 'required_when:tipo,Regalo',
        correo: 'email|min:8|max:45'
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
    },
    rules_update_user: {
        id: 'required|integer',
        nombre: 'required|min:3|max:45',
        apellido: 'required|min:3|max:45',
        rol: 'required|in:admin,standard',
        is_active: 'boolean',
        email: 'email|min:8|max:45',
        password: 'required|min:8|max:60|confirmed',
        password_confirmation: 'required|min:8|max:60'
    }
};

module.exports = rules;