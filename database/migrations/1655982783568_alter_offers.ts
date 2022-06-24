import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'offers'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description')
      table.integer('client_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('description')
      table.integer('client_id')
    })
  }
}