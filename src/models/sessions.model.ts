import {
  DataTypes,
  Association,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyAddAssociationMixin,
} from "sequelize";
import { ModelName, SettingName, CriticalDMGModel, Application } from "../declarations";
import { UserModel } from "./users.model";
import { EventModel } from "./events.model";
import { SessionLogModel } from "./sessionLogs.model";

export class SessionModel extends CriticalDMGModel {
  public name!: string;

  public readonly players!: UserModel[];
  public readonly log!: SessionLogModel[];

  public getPlayers!: HasManyGetAssociationsMixin<UserModel>;
  public getLog!: HasManyGetAssociationsMixin<SessionLogModel>;

  public addPlayer!: HasManyAddAssociationMixin<UserModel, number>;
  public createLog!: HasManyCreateAssociationMixin<SessionLogModel>;

  public addEvent!: HasManyAddAssociationMixin<EventModel, number>;
  public createEvent!: HasManyCreateAssociationMixin<EventModel>;

  public static associations: {
    players: Association<SessionModel, UserModel>;
    log: Association<SessionModel, SessionLogModel>;
    events: Association<SessionModel, EventModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof SessionModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  SessionModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.SESSION,
      modelName: ModelName.SESSION,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  SessionModel.associate = function (models) {
    this.belongsToMany(models[ModelName.USER], {
      through: ModelName.SESSION_SUBSCRIPTION,
      as: "players",
    });

    this.hasMany(models[ModelName.SESSION_LOG], {
      as: "log",
    });

    this.hasMany(models[ModelName.EVENT], {
      as: "events",
    });
  };

  return SessionModel;
}
