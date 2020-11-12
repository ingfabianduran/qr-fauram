'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
    compras() {
        return this.hasMany('App/Models/Compra');
    }

    bonos() {
        return this.hasMany('App/Models/Bono');
    }
}

module.exports = Cliente
