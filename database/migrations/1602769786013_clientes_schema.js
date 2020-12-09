'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientesSchema extends Schema {
  up () {
    this.create('clientes', (table) => {
      table.increments()
      table.bigInteger('identificacion').unique().notNullable()
      table.string('nombre', 45).notNullable()
      table.string('apellido', 45).notNullable()
      table.string('contacto', 10)
      table.string('correo', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('clientes')
  }
}

module.exports = ClientesSchema
