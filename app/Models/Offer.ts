import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { ModalityJob } from 'app/Models/contracts/Enums/ModalityJob'
import Technology from './Technology'

export default class Offer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @manyToMany(() => Technology, {
    pivotForeignKey: 'offer_id',
    pivotTable: 'offers_technologies',
  })
  public technologies: ManyToMany<typeof Technology>

  @column()
  public type: ModalityJob // Enum remote, on-site, hybrid

  @column()
  public experienceYears: number

  @column()
  public price: number

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
