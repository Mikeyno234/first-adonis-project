
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bolas'

  public async up () {
  
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string("Judul");
      table.string("link_file");
      table.text("isi");
      table.text("foto");
      table.tinyint("dihapus").defaultTo(0);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
