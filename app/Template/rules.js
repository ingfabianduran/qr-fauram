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
        id: {
            required: true,
            digits: true
        },
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
    },
    update_redimir: {
        id: {
            required: true,
            digits: true
        },
        identificacion: {
            required: true,
            digits: true
        }, 
        valor: {
            required: true,
            number: true
        },
        contacto: {
            digits: true
        },
        bono_id: {
            required: true,
            digits: true
        }
    },
    update_compra: {
        id: {
            required: true,
            digits: true
        },
        tipo: {
            required: true
        }, 
        valor: {
            required: true,
            number: true
        },
        cliente_id: {
            required: true,
            digits: true
        }
    },
    nuevo_usuario: {
        nombre: {
            required: true,
            rangelength: [3, 45]
        },
        apellido: {
            required: true,
            rangelength: [3, 45]
        },
        rol: {
            required: true
        },
        email: {
            required: true,
            email: true,
            rangelength: [8, 45]
        },
        password: {
            required: true,
            rangelength: [8, 60]
        },
        confirm_password: {
            required: true,
            rangelength: [8, 60],
            equalTo: '#password'
        }
    },
    update_usuario: {
        id: {
            required: true,
            digits: true
        },
        nombre: {
            required: true,
            rangelength: [3, 45]
        },
        apellido: {
            required: true,
            rangelength: [3, 45]
        },
        rol: {
            required: true
        },
        email: {
            required: true,
            email: true,
            rangelength: [8, 45]
        },
        password: {
            required: true,
            rangelength: [8, 60]
        },
        password_confirmation: {
            required: true,
            rangelength: [8, 60],
            equalTo: '#password'
        }
    }
}

module.exports = rules;