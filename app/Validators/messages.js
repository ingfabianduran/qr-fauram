const messages = {
    messages: {
        'required': 'El atributo {{ field }} es requerido',
        'min': 'La logitud minima del atributo {{ field }} es de {{ argument.0 }}',
        'max': 'La logitud maxima del atributo {{ field }} es de {{ argument.0 }}',
        'unique': 'El atributo {{ field }} ya existe en la base de datos',
        'integer': 'El atributo {{ field }} debe ser numerico',
        'in': 'El valor del atributo {{ field }} no existe en los parametros aceptados',
        'number': 'El valor del atributo {{ field }} debe ser numerico',
        'required_when': 'El valor del atributo es requerido ya que se seleccionó {{ argument.0 }}'
    }
};

module.exports = messages;