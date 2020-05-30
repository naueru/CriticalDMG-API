import {
  DataTypes,
  Association,
  HasOneSetAssociationMixin,
  HasOneGetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
} from "../declarations";
import { SessionModel } from "./sessions.model";
import { UserModel } from "./users.model";

export class CampaignModel extends CriticalDMGModel {
  public name!: string;

  public getOwner!: HasOneGetAssociationMixin<UserModel>;
  public getSessions!: HasManyGetAssociationsMixin<SessionModel>;

  public addSession!: HasManyAddAssociationMixin<SessionModel, number>;
  public setOwner!: HasOneSetAssociationMixin<UserModel, number>;

  /** ADD Character model association (players)*/
  /** ADD Event model association */
  /** ADD CampaignTemplate model association */
  /** ADD haracter model association npc */

  public static associations: {
    session: Association<CampaignModel, SessionModel>;
    owner: Association<CampaignModel, UserModel>;

    /** ADD Character model association (players)*/
    /** ADD Event model association */
    /** ADD CampaignTemplate model association */
    /** ADD haracter model association npc */
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof CampaignModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  CampaignModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.CAMPAIGN,
      modelName: ModelName.CAMPAIGN,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  CampaignModel.associate = function (models) {
    this.hasMany(models[ModelName.SESSION], {
      as: "sessions",
    });
    this.hasOne(models[ModelName.USER], {
      as: "owner",
    });
    /** ADD Character model association (players)*/
    /** ADD Event model association */
    /** ADD CampaignTemplate model association */
    /** ADD haracter model association npc */
  };

  return CampaignModel;
}
