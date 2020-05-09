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
import { RoomModel } from "./room.model";

export class RoomLogModel extends CriticalDMGModel {
  public type!: LogType;
  public content!: LogContent;

  public static associations: {
    room: Association<RoomLogModel, RoomModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof RoomLogModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  RoomLogModel.init(
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
      tableName: ModelName.ROOM_LOG,
      modelName: ModelName.ROOM_LOG,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  RoomLogModel.associate = function (models) {
    this.belongsTo(models[ModelName.ROOM], {
      as: "room",
    });
  };

  return RoomLogModel;
}
