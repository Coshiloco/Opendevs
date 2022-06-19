import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.post('/login', 'UsersController.login')
Route.post('/register', 'UsersController.store')

Route.group(() => {
  Route.get('/index/:id', 'KeywordsController.index')
  Route.get('/index', 'KeywordsController.index')
  Route.post('/create', 'keywordsController.store')
}).prefix('/keyword')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
