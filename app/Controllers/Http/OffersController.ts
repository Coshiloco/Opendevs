import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Offer from 'App/Models/Offer'
import Technology from 'App/Models/Technology'
import CreateOfferValidator from 'App/Validators/CreateOfferValidator'

export default class OffersController {
  public async index({ response }: HttpContextContract) {
    const offer = await Offer.all()
    return response.json(offer)
  }

  // .groupOrderBy('projects.updated_at', 'desc')
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
      const offers = await Offer.query()
        .where('id', id)
        .preload('technologies')
        .preload('client')
        .firstOrFail()
      return response.json(offers)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CreateOfferValidator)
    const tech1 = await Technology.findOrFail(12)
    const tech2 = await Technology.findOrFail(13)
    const offer = await Offer.create(validateData)
    await offer.related('technologies').attach([tech1.id, tech2.id])

    if (validateData.technologies) {
      await offer.related('technologies')
      console.log('Hey !')
      //sync(validateData.technologies)
    }
    await offer.save()
    return response.created({ data: offer })
  }

  public async update({ params: { id }, response, request }: HttpContextContract) {
    const offer = await Offer.findByOrFail('id', id)
    await offer.merge(request.all()).save()
    return response.ok({ data: offer })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const offer = await Offer.findByOrFail('id', request.params().id)
    await offer.delete()
    return response.ok('Oferta eliminada')
  }
}
