'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Compra extends Model {
    clientes() {
        return this.belongsTo('App/Models/Cliente');
    }

    bonos() {
        return this.hasOne('App/Models/Bono');
    }
}

module.exports = Compra
