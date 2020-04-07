import { Application, CriticalDMGSequelize, SettingName } from "./declarations";

export default function (app: Application) {
  const DATABASE_CONFIGURATION = app.get(SettingName.DATABASE_CONFIGURATION);
  const sequelize = new CriticalDMGSequelize(
    DATABASE_CONFIGURATION.NAME,
    DATABASE_CONFIGURATION.USERNAME,
    DATABASE_CONFIGURATION.PASSWORD,
    {
      host: DATABASE_CONFIGURATION.HOST,
      port: DATABASE_CONFIGURATION.PORT,
      dialect: DATABASE_CONFIGURATION.DIALECT,
      logging: false,
      define: {
        freezeTableName: true,
      },
    }
  );
  const oldSetup = app.setup;
  app.set(SettingName.SEQUELIZE, sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.values(models).forEach((Model) => {
      if (Model.associate) {
        Model.associate(models);
      }
    });

    // Sync to the database
    app.set(SettingName.SEQUELIZE_SYNC, sequelize.sync());

    return result;
  };
}
