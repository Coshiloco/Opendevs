import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Offer from './Offer'
import Client from './Client'

export default class Tecnologia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @belongsTo(() => Offer, {
    localKey: 'name',
  })
  public offers: BelongsTo<typeof Offer>

  @belongsTo(() => Client, {
    localKey: 'name',
  })
  public client: BelongsTo<typeof Client>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
