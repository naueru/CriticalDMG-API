import { DataTypes, Association } from "sequelize";
import { ModelName, SettingName, CriticalDMGModel, Application } from "../declarations";
import { SessionModel } from "./sessions.model";

export class EventModel extends CriticalDMGModel {
  command!: string;

  public static associations: {
    session: Association<EventModel, SessionModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof EventModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  EventModel.init(
    {
      command: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.EVENT,
      modelName: ModelName.EVENT,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  EventModel.associate = function (models) {
    this.belongsTo(models[ModelName.SESSION]);
  };

  return EventModel;
}
