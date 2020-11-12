'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Redimido extends Model {
    bonos() {
        return this.hasOne('App/Models/Bono');
    }
}

module.exports = Redimido
