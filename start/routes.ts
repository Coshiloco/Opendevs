import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.group(() => {
  Route.get('/index/:id', 'UsersController.index_id')
  Route.get('/index', 'UsersController.index')
  Route.post('/login', 'UsersController.login')
  Route.post('/register', 'UsersController.store')
  Route.delete('/delete/:id', 'UsersController.delete')
  Route.patch('/update/:id', 'UsersController.update')
}).prefix('/Users')

Route.group(() => {
  Route.get('/index/:id', 'OffersController.index_id')
  Route.get('/index', 'OffersController.index')
  Route.get('/query/:id', 'OffersController.query')
  Route.post('/login', 'OffersController.login')
  Route.post('/create', 'OffersController.store')
  Route.delete('/delete/:id', 'OffersController.delete')
  Route.patch('/update/:id', 'OffersController.update')
}).prefix('/Offers')

Route.group(() => {
  Route.get('/index/:id', 'ClientsController.index_id')
  Route.get('/index', 'ClientsController.index')
  Route.get('/query/:id', 'ClientsController.query')
  Route.post('/login', 'ClientsController.login')
  Route.post('/create', 'ClientsController.store')
  Route.delete('/delete/:id', 'ClientsController.delete')
  Route.patch('/update/:id', 'ClientsController.update')
}).prefix('/Clients')

Route.group(() => {
  Route.get('/index/:id', 'TechnologiesController.index_id')
  Route.get('/index', 'TechnologiesController.index')
  Route.post('/create', 'TechnologiesController.store')
  Route.delete('/delete/:id', 'TechnologiesController.delete')
  Route.patch('/update/:id', 'TechnologiesController.update')
}).prefix('/Technologies')

//apiOnly (como colocarlo)

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
