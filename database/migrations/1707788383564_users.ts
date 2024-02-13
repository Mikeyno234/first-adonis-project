import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User';

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nama').notNullable();
      table.integer('umur');
      table.string('email',255).notNullable().unique();
      table.string('password',180).notNullable();
      table.string('role');
      table.tinyint('dihapus').defaultTo(0);
      table.string('remember_me_token').nullable();
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true,true)  
    });

  
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }

  
}
