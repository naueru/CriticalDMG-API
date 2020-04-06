import { DataTypes, Association } from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
  LogType,
  LogData,
  LogTypeEnum,
} from "../declarations";
import { RoomModel } from "./room.model";

export class RoomLogModel extends CriticalDMGModel {
  public type!: LogType;
  public jsonData!: string;

  public get data(): LogData {
    return JSON.parse(this.jsonData) as LogData;
  }

  public set data(value: LogData) {
    this.setDataValue("jsonData", JSON.stringify(value));
  }

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

      jsonData: {
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
