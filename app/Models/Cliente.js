'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
    compra() {
        return this.hasMany('App/Models/Compra');
    }

    Bono() {
        return this.hasMany('App/Models/Bono');
    }
}

module.exports = Cliente
