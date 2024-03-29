'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComprasSchema extends Schema {
  up () {
    this.create('compras', (table) => {
      table.increments()
      table.enu('tipo', ['Regalo', 'Recarga', 'Recarga valor']).notNullable()
      table.decimal('valor').notNullable()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onUpdate('CASCADE').onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('compras')
  }
}

module.exports = ComprasSchema
