import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  // Load compiled JS entities by default. If you want to run directly from TS
  // (e.g. with ts-node), set USE_TS=true in the environment to load the TS sources.
  entities: ['dist/**/*.entity.js'],
  ...(process.env.USE_TS === 'true' ? { entitiesTs: ['src/**/*.entity.ts'] } : {}),
  dbName: 'miturnodb',
  type: 'mysql',
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
