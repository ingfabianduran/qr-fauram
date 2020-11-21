'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bono extends Model {
    clientes() {
        return this.belongsTo('App/Models/Cliente');
    }

    compras() {
        return this.hasMany('App/Models/Compra');
    }

    redimidos() {
        return this.hasMany('App/Models/Cliente');
    }

    // Format Dates: 
    static castDates(field, value) {
        return value ? value.format("YYYY-MM-DD") : value;
    }
}

module.exports = Bono
