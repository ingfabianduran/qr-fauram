'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BonosSchema extends Schema {
  up () {
    this.create('bonos', (table) => {
      table.increments()
      table.enu('tipo', ['Regalo', 'Recarga']).notNullable()
      table.text('contenido', 'longtext').unique().notNullable()
      table.string('correo', 45)
      table.decimal('saldo').notNullable()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bonos')
  }
}

module.exports = BonosSchema
