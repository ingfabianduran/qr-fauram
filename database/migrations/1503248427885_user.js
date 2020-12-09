'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('nombre', 45).notNullable()
      table.string('apellido', 45).notNullable()
      table.enum('rol', ['admin', 'standard']).notNullable()
      table.boolean('is_active').defaultTo(false).notNullable()
      table.string('email', 45).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('password_confirmation', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
