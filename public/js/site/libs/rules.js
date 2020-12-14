// Get rules by forms this app: 
function get_rules() {
    const rules = {
        cliente: {
            identificacion: {
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
            contacto: {
                digits: true
            },
            correo: {
                email: true,
                rangelength: [8, 80]
            }
        }, 
        bono: {
            tipo: {
                required: true
            },
            saldo: {
                required: true,
                number: true
            },
            quien_redime: {
                required: {
                    depends: function(element) {
                        if ($('#tipo').val() === 'Regalo') return true;
                        else return false;
                    }
                },
                rangelength: [3, 80]
            },
            correo: {
                email: true
            }
        },
        bono_recargar: {
            id_bono: {
                required: true,
                digits: true
            },
            tipo_bono: {
                required: true,
                only_recarga: true
            },
            valor_recarga: {
                required: true,
                digits: true
            }
        },
        bono_redimir: {
            identificacion: {
                required: true,
                digits: true,
            },
            nombre_quien_redime: {
                required: true,
                rangelength: [8, 80]
            },
            contacto: {
                digits: true
            },
            valor: {
                required: true,
                digits: true
            },
            n_factura: {
                required: true,
                digits: true
            },
            bono_id: {
                required: true,
                digits: true
            }
        },
        user: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
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
                rangelength: [8, 80]
            },
            password: {
                required: true,
                rangelength: [8, 60]
            },
            password_confirmation: {
                required: true,
                rangelength: [8, 60],
                equalTo: '#password'
            },
            is_active: {
                required: true
            }
        },
        delete: {
            id: {
                required: true,
                digits: true
            }
        }
    };
    return rules;
}