import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ModalityJob } from 'app/Models/Contracts/Enums/ModalityJob'

export default class extends BaseSchema {
  protected tableName = 'offers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.integer('experience_years')
      table.integer('price')
      table.enum('type', Object.values(ModalityJob))

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
