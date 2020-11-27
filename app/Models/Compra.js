'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Compra extends Model {
    clientes() {
        return this.belongsTo('App/Models/Cliente');
    }

    // Format Dates: 
    static castDates(field, value) {
        return value ? value.format("YYYY-MM-DD") : value;
    }
}

module.exports = Compra
