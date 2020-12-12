const template = {
    set_update_json(json) {
        let data = {};
        for (var clave in json) {
            if (clave != 'id' && clave != '_csrf' && clave != 'password_confirmation')
                data[clave] = json[clave];
        }
        
        return data;
    }
}

module.exports = template;