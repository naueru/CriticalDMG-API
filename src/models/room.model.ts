import {
  DataTypes,
  Association,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyAddAssociationMixin,
} from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
} from "../declarations";
import { UserModel } from "./users.model";
import { RoomLogModel } from "./roomLog.model";

export class RoomModel extends CriticalDMGModel {
  public name!: string;

  public readonly players!: UserModel[];
  public readonly log!: RoomLogModel[];

  public getPlayers!: HasManyGetAssociationsMixin<UserModel>;
  public getLog!: HasManyGetAssociationsMixin<RoomLogModel>;

  public addPlayer!: HasManyAddAssociationMixin<UserModel, number>;
  public createLog!: HasManyCreateAssociationMixin<RoomLogModel>;

  public static associations: {
    players: Association<RoomModel, UserModel>;
    log: Association<RoomModel, RoomLogModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof RoomModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  RoomModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.ROOM,
      modelName: ModelName.ROOM,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  RoomModel.associate = function (models) {
    this.belongsToMany(models[ModelName.USER], {
      through: ModelName.ROOM_SUBSCRIPTION,
      as: "players",
    });

    this.hasMany(models[ModelName.ROOM_LOG], {
      as: "log",
    });
  };

  return RoomModel;
}
