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
            tipo_bono: {
                required: true
            },
            valor_bono: {
                required: true,
                digits: true
            },
            add_nombre_redimir: {
                required: {
                    depends: function(element) {
                        if ($('#tipo_bono').val() === 'Regalo') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                rangelength: [3, 60]
            },
            add_correo_redimir: {
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