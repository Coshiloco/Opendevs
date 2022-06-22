import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Offer from 'App/Models/Offer'
import Technology from 'App/Models/Technology'
import CreateOfferValidator from 'App/Validators/CreateOfferValidator'

export default class OffersController {
  public async index({ response }: HttpContextContract) {
    const offer = await Offer.all()
    return response.json(offer)
  }

  public async query({ response }: HttpContextContract) {
    const query = await Technology.query().preload('offers')
    return response.json(query)
  }

  public async index_id({ response, request }: HttpContextContract) {
    try {
      const offer = await Offer.findBy('id', request.params().id)
      return response.json(offer)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateOfferValidator)
    const offer = await Offer.create(validateData)
    return response.created({ data: offer })
  }

  public async update({ request, response }: HttpContextContract) {
    const offer = await Offer.findByOrFail('id', request.params().id)
    await offer.merge(request.all()).save()
    return response.ok({ data: offer })
  }

  public async delete({ request, response }: HttpContextContract) {
    const offer = await Offer.findByOrFail('id', request.params().id)
    await offer.delete()
    return response.ok('Oferta eliminada')
  }
}
