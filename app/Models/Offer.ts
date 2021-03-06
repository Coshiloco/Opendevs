import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { ModalityJob } from './Contracts/Enums/ModalityJob'
import Technology from './Technology'
import Client from './Client'

export default class Offer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @manyToMany(() => Technology, {
    pivotTable: 'offers_technologies',
    pivotTimestamps: true,
    //    pivotForeignKey: 'offer_id',
  })
  public technologies: ManyToMany<typeof Technology>

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @column()
  public type: ModalityJob // Enum remote, on-site, hybrid

  @column()
  public experienceYears: number

  @column()
  public price: number

  @column()
  public clientId: number

  @column()
  public location: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
