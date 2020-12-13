'use strict'

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

Route.get('', 'UserController.index');
Route.post('/user/login', 'UserController.logIn');

Route.group(() => {
    Route.get('', 'BonoController.index');
    Route.get('gestion', 'BonoController.gestion');
    Route.get('print/:id', 'BonoController.get_info_by_pdf');
    Route.get('search/:content', 'BonoController.search_bono');
    Route.get('search/redimir/:content', 'BonoController.search_bono_by_redimir');
    Route.get('list', 'BonoController.list_bonos');
    Route.get('search/update/:id', 'BonoController.search_bono_by_id');
    Route.post('add', 'BonoController.validate_bono');
    Route.put('recargar', 'BonoController.recargar_bono');
    Route.put('update', 'BonoController.update_bono');
}).prefix('/bono/').middleware('auth');

Route.group(() => {
    Route.get('', 'ClienteController.index');
    Route.get('list', 'ClienteController.list_clientes');
    Route.get('search/:ident', 'ClienteController.search_cliente');
    Route.get('search/update/:id', 'ClienteController.search_cliente_by_id');
    Route.post('add', 'ClienteController.add_cliente');
    Route.put('update', 'ClienteController.update_cliente');
}).prefix('/cliente/').middleware('auth');

Route.group(() => {
    Route.get('', 'RedimidoController.index');
    Route.get('list', 'RedimidoController.list_redimidos');
    Route.get('search/update/:id', 'RedimidoController.search_redimido_by_id');
    Route.post('add', 'RedimidoController.redimir_bono');
    Route.put('update', 'RedimidoController.update_redimido');
}).prefix('/redimir/').middleware('auth');

Route.group(() => {
    Route.get('', 'CompraController.index'); 
    Route.get('list', 'CompraController.list_compras');
    Route.get('search/update/:id', 'CompraController.search_compra_by_id');
    Route.put('update', 'CompraController.update_compra');
}).prefix('/compra/').middleware('auth');

Route.group(() => {
    Route.get('', 'UserController.view_users');
    Route.get('list', 'UserController.list_users');
    Route.get('add/template', 'UserController.get_template_new_user');
    Route.get('search/update/:id', 'UserController.search_user_by_id');
    Route.get('logout', 'UserController.logout');
    Route.get('add', 'UserController.view_form_new_user');
    Route.post('/login', 'UserController.logIn');
    Route.post('add', 'UserController.add_user');
    Route.put('update', 'UserController.update_user');
}).prefix('/user/').middleware('auth');