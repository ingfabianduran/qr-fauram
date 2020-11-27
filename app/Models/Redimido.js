'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Redimido extends Model {
    bonos() {
        return this.belongsTo('App/Models/Bono');
    }

    // Format Dates: 
    static castDates(field, value) {
        return value ? value.format("YYYY-MM-DD") : value;
    }
}

module.exports = Redimido
