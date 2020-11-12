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
        bono: {
            tipo: {
                required: true
            },
            saldo: {
                required: true,
                digits: true
            },
            quien_redime: {
                required: {
                    depends: function(element) {
                        if ($('#tipo').val() === 'Regalo') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                rangelength: [3, 60]
            },
            correo: {
                email: true
            }
        },
        bono_recargar: {
            valor_recarga: {
                required: true,
                digits: true
            }
        }
    };
    return rules;
}