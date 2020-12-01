const template = {
    create_modal_update (id_form, title, data) {
        let form = `<div class="modal-header bg-info">
                        <h4 class="modal-title">${title}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div><form id="${id_form}"><div class="modal-body">`;
        for (const property in data) {
            form += `<div class="form-group">
                        ${this.get_input(data, property)}
                     </div>`;
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

    get_input (data, property) {
        if (property != 'created_at' && property != 'updated_at') {
            if (property != 'id') {
                return `<label for="${property}">${this.spaces(property)}:</label><input type="text" class="form-control" id="${property}" value="${data[property]}">`;
            } else {
                return `<input type="hidden" class="form-control" id="${property}" value="${data[property]}">`;
            }
        } else {
            return '';
        }
    }
}

module.exports = template;