import { DataTypes, Association } from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
  LogType,
  LogTypeEnum,
  LogContent,
} from "../declarations";
import { SessionModel } from "./sessions.model";

export class SessionLogModel extends CriticalDMGModel {
  public type!: LogType;
  public content!: LogContent;

  public static associations: {
    session: Association<SessionLogModel, SessionModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof SessionLogModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  SessionLogModel.init(
    {
      type: {
        type: DataTypes.ENUM(LogTypeEnum.MESSAGE, LogTypeEnum.EVENT),
        allowNull: false,
      },

      content: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      tableName: ModelName.SESSION_LOG,
      modelName: ModelName.SESSION_LOG,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  SessionLogModel.associate = function (models) {
    this.belongsTo(models[ModelName.SESSION], {
      as: "session",
    });
  };

  return SessionLogModel;
}
