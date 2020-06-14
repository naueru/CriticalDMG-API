import { DataTypes, Association } from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
} from "../declarations";
import { EventModel } from "./events.model";

export class EventTemplateModel extends CriticalDMGModel {
  command!: string;
  public static associations: {
    events: Association<EventTemplateModel, EventModel>;
  };
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof EventTemplateModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  EventTemplateModel.init(
    {
      command: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.EVENT_TEMPLATE,
      modelName: ModelName.EVENT_TEMPLATE,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  EventTemplateModel.associate = function (models) {
    this.hasMany(models[ModelName.EVENT]);
  };

  return EventTemplateModel;
}
