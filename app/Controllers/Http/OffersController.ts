import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Offer from 'App/Models/Offer'
import CreateOfferValidator from 'App/Validators/CreateOfferValidator'

export default class OffersController {
  public async index({ response }: HttpContextContract) {
    const offer = await Offer.all()
    return response.json(offer)
  }

  // .groupOrderBy('projects.updated_at', 'desc')

  public async query({ request, response }: HttpContextContract) {
    const offers = await Offer.query()
      .where('id', request.params().id)
      .preload('technologies')
      .preload('client')
      .firstOrFail()
    return response.json(offers)
  }
  /*
  public async filter({ request, response }: HttpContextContract) {
    const offers = await Offer.query()
      .where('id', request.params().id)
      .preload('technologies')
      .preload('client')
      .firstOrFail()
    return response.json(offers)
  }*/

  public async show({ params: { id }, response }: HttpContextContract) {
    try {
      const offer = await Offer.findBy('id', id)
      return response.json(offer)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateOfferValidator)
    const offer = await Offer.create(validateData)
    if (validateData.technologies) {
      await offer.related('technologies').sync(validateData.technologies)
    }
    await offer.save()
    return response.created({ data: offer })
  }

  public async update({ params: { id }, response, request }: HttpContextContract) {
    const offer = await Offer.findByOrFail('id', id)
    await offer.merge(request.all()).save()
    return response.ok({ data: offer })
  }

  public async delete({ request, response }: HttpContextContract) {
    const offer = await Offer.findByOrFail('id', request.params().id)
    await offer.delete()
    return response.ok('Oferta eliminada')
  }
}
