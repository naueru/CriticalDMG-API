import {
  DataTypes,
  Association,
  HasOneSetAssociationMixin,
  HasOneGetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  BelongsToGetAssociationMixin,
} from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
} from "../declarations";
import { SessionModel } from "./sessions.model";
import { UserModel } from "./users.model";
import { CharacterModel } from "./characters.model";
import { CampaignTemplateModel } from "./campaignTemplates.model";

export class CampaignModel extends CriticalDMGModel {
  public name!: string;

  public getOwner!: HasOneGetAssociationMixin<UserModel>;
  public getSessions!: HasManyGetAssociationsMixin<SessionModel>;

  public addSession!: HasManyAddAssociationMixin<SessionModel, number>;
  public setOwner!: HasOneSetAssociationMixin<UserModel, number>;

  public addPlayer!: HasManyAddAssociationMixin<CharacterModel, number>;
  public getPlayers!: HasManyGetAssociationsMixin<CharacterModel>;

  public addNpc!: HasManyAddAssociationMixin<CharacterModel, number>;
  public getNpcs!: HasManyGetAssociationsMixin<CharacterModel>;

  public getTemplate!: BelongsToGetAssociationMixin<CampaignTemplateModel>;
  /** ADD Event model association */

  public static associations: {
    session: Association<CampaignModel, SessionModel>;
    owner: Association<CampaignModel, UserModel>;
    npcs: Association<CampaignModel, CharacterModel>;
    players: Association<CampaignModel, CharacterModel>;
    template: Association<CampaignModel, CampaignTemplateModel>;

    /** ADD Event model association */
    /** ADD CampaignTemplate model association */
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

    // TODO should we merge these two?
    this.hasMany(models[ModelName.CHARACTER], {
      as: "players",
    });
    this.hasMany(models[ModelName.CHARACTER], {
      as: "npcs",
    });

    this.belongsTo(models[ModelName.CAMPAIGN_TEMPLATE], {
      as: "template",
    });

    /** ADD Event model association */
  };

  return CampaignModel;
}
