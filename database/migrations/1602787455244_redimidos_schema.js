'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RedimidosSchema extends Schema {
  up () {
    this.create('redimidos', (table) => {
      table.increments()
      table.bigInteger('identificacion').notNullable()
      table.decimal('valor').notNullable()
      table.string('contacto', 10)
      table.integer('bono_id').unsigned().references('id').inTable('bonos').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('redimidos')
  }
}

module.exports = RedimidosSchema
