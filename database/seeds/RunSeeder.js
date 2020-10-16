'use strict'

/*
|--------------------------------------------------------------------------
| RunSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RunSeeder {
  async run () {
    const data_compra = require('../data/Compra');
    try {
      await data_compra.generar_bonos(10, 'Regalo');
      await data_compra.generar_bonos(10, 'Recarga'); 
      console.log('###### Registros creados correctamente!!!!! ######');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = RunSeeder
