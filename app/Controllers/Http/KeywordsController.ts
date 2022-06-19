import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Keyword from 'App/Models/Keyword'
import CreateKeywordValidator from 'App/Validators/CreateKeywordValidator'

export default class KeywordsController {
  public async index({ response }: HttpContextContract) {
    const keywords = await Keyword.all()
    return response.json(keywords)
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateKeywordValidator)
    const keyword = await Keyword.create(validateData)
    return response.created({ data: keyword })
  }
}
