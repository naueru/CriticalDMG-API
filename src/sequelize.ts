import { Application, SettingName } from "./declarations";

import { Sequelize } from "sequelize-typescript";

export default function (app: Application): void {
  const DATABASE_CONFIGURATION = app.get(SettingName.DATABASE_CONFIGURATION);
  const sequelize = new Sequelize({
    database: DATABASE_CONFIGURATION.NAME,
    username: DATABASE_CONFIGURATION.USERNAME,
    password: DATABASE_CONFIGURATION.PASSWORD,
    host: DATABASE_CONFIGURATION.HOST,
    port: DATABASE_CONFIGURATION.PORT,
    dialect: DATABASE_CONFIGURATION.DIALECT,
    logging: false,
    define: {
      freezeTableName: true,
    },
    dialectOptions: {
      ssl: true,
    },
    models: [`${__dirname}/models`],
  });

  const oldSetup = app.setup;
  app.set(SettingName.SEQUELIZE, sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Sync to the database
    app.set(SettingName.SEQUELIZE_SYNC, sequelize.sync());

    return result;
  };
}
