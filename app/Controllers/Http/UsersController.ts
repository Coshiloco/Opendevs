import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()
    console.log('login')

    try {
      const token = await auth.attempt(email, password)

      return { token: token, data: auth.user }
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateUserValidator)
    const user = await User.create(validateData)
    return response.created({ data: user })
  }
}
