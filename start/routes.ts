import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.post('/login', 'UsersController.login')
Route.post('/register', 'UsersController.store')

Route.group(() => {
  Route.get('/index/:id', 'TecnologiasController.index_id')
  Route.get('/index', 'TecnologiasController.index')
  Route.post('/create', 'TecnologiasController.store')
  Route.delete('/delete/:id', 'TecnologiasController.delete')
  Route.patch('/update/:id', 'TecnologiasController.update')
}).prefix('/tecnologias')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
