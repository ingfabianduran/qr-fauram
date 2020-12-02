const rules = {
    update_cliente: {
        id: {
            required: true,
            digits: true
        },
        identificacion: {
            required: true,
            digits: true
        },
        nombre: {
            required: true,
            rangelength: [3, 60]
        },
        apellido: {
            required: true,
            rangelength: [3, 60]
        },
        contacto: {
            digits: true
        },
        correo: {
            email: true
        }
    },
    update_bono: {
        tipo: {
            required: true
        },
        contenido: {
            required: true
        },
        quien_redime: {
            rangelength: [3, 45],
            required: {
                depends: function(element) {
                    if ($('#tipo').val() === 'Regalo') return true;
                    else return false;
                }
            },
        },
        correo: {
            email: true,
            rangelength: [10, 45]
        }, 
        saldo: {
            required: true,
            number: true
        },
        cliente_id: {
            required: true,
            digits: true
        }
    }
}

module.exports = rules;