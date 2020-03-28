import { Application, CriticalDMGSequelize, SettingName } from "./declarations";

export default function(app: Application) {
  const connectionString = app.get(SettingName.POSTGRES);
  const sequelize = new CriticalDMGSequelize(connectionString, {
    dialect: "postgres",
    logging: false,
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;
  app.set(SettingName.SEQUELIZE, sequelize);

  app.setup = function(...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.values(models).forEach(Model => {
      if (Model.associate) {
        Model.associate(models);
      }
    });

    // Sync to the database
    app.set(SettingName.SEQUELIZE_SYNC, sequelize.sync());

    return result;
  };
}
