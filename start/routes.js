'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('', 'BonoController.index');
    Route.get('print/:id', 'BonoController.get_info_by_pdf');
    Route.get('search/:content', 'BonoController.search_bono');
    Route.get('search/redimir/:content', 'BonoController.search_bono_by_redimir');
    Route.post('add', 'BonoController.validate_bono');
    Route.put('recargar', 'BonoController.recargar_bono');
}).prefix('/bono/');

Route.group(() => {
    Route.get('search/:ident', 'ClienteController.search_cliente');
    Route.post('add', 'ClienteController.add_cliente');
}).prefix('/cliente/');

Route.group(() => {
    Route.post('add', 'RedimidoController.redimir_bono');
}).prefix('/redimir/');