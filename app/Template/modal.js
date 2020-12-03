const template = {
    create_modal_update (id_form, title, data, select) {
        let form = `<div class="modal-header bg-info">
                        <h4 class="modal-title">${title}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div><form id="${id_form}"><div class="modal-body">`;
        for (const property in data) {
            form += this.get_input(data, property, select);
        }
        form += `</div>
                 <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-success">Registrar</button>
                 </div></form>`;
        return form;
    },

    capitalize (label) {
        return label[0].toUpperCase() + label.slice(1);
    }, 

    spaces (label) {
        const capitalize_label = this.capitalize(label);
        return capitalize_label.replace('_', ' '); 
    },

    get_input (data, property, select) {
        if (property != 'created_at' && property != 'updated_at') {
            if (property != 'id') {
                if (property === 'tipo' && select) {
                    return `<div class="form-group">${this.input_select(data, property, select)}</div>`;
                } else {
                    return `<div class="form-group"><label for="${property}">${this.spaces(property)}:</label><input type="text" class="form-control" id="${property}" name="${property}" value="${data[property]}"></div>`;
                }
            } else {
                return `<div class="form-group"><input type="hidden" class="form-control" id="${property}" name="${property}" value="${data[property]}"></div>`;
            } 
        } else {
            return '';
        }
    },

    input_select(data, property, select) {
        let input_select = `<div class="form-group"><label for="${property}">${this.spaces(property)}:</label>
                            <select id="${property}" name="${property}" class="form-control custom-select">
                                <option value="">Seleccioné un tipo</option>`;
        for (const i in select) {
            if (select[i].value === data[property]) {
                input_select += `<option selected value="${select[i].value}">${select[i].value}</option>`;
            } else {
                input_select += `<option value="${select[i].value}">${select[i].value}</option>`;
            }
        }
        input_select += `</select></div>`;
        return input_select;
    }
}

module.exports = template;