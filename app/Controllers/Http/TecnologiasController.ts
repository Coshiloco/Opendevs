import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Tecnologia from 'App/Models/Tecnologia'
import CreatetecnologiaValidator from 'App/Validators/CreatetecnologiaValidator'

export default class TecnologiasController {
  public async index({ response }: HttpContextContract) {
    const tecnologias = await Tecnologia.all()
    return response.json(tecnologias)
  }

  public async index_id({ response, request }: HttpContextContract) {
    const tecnologia = await Tecnologia.findBy('id', request.params().id)
    return response.json(tecnologia)
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreatetecnologiaValidator)
    const tecnologia = await Tecnologia.create(validateData)
    return response.created({ data: tecnologia })
  }

  public async update({ request, response }: HttpContextContract) {
    const tecnologia = await Tecnologia.findByOrFail('id', request.params().id)
    await tecnologia.merge(request.all()).save()
    return response.ok({ data: tecnologia })
  }

  public async delete({ request, response }: HttpContextContract) {
    const tecnologia = await Tecnologia.findByOrFail('id', request.params().id)
    await tecnologia.delete()
    return response.ok('Tecnología eliminada')
  }
}
