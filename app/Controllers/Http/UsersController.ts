import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)

      return { token: token, data: auth.user }
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const user = await User.all()
    return response.json(user)
  }

  public async index_id({ response, request }: HttpContextContract) {
    try {
      const user = await User.findBy('id', request.params().id)
      return response.json(user)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateUserValidator)
    const user = await User.create(validateData)
    return response.created({ data: user })
  }

  public async update({ request, response }: HttpContextContract) {
    const user = await User.findByOrFail('id', request.params().id)
    await user.merge(request.all()).save()
    return response.ok({ data: user })
  }

  public async delete({ request, response }: HttpContextContract) {
    const user = await User.findByOrFail('id', request.params().id)
    await user.delete()
    return response.ok('Usuario eliminado')
  }
}
