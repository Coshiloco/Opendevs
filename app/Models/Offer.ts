import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Tecnologia from './Tecnologia'
import ModalityJob from 'Contracts/Enums/modalityJob'

export default class Offer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public tecnologias: Tecnologia

  @column()
  public type: ModalityJob // Enum remote, on-site, hybrid

  @column()
  public client: Client

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
