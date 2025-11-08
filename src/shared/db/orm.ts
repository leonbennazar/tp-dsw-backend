import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'miturnodb',
  //type: 'mysql',
  clientUrl: 'mysql://dsw:dsw@localhost:3306/miturnodb',
  debug: true,
  schemaGenerator: {
    //SOLO PARA DESAROLLO ESTO
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  /*
  await generator.dropSchema()    Esto es para borrar y crear el schema
  await generator.createSchema()
  */
  await generator.updateSchema();
};
