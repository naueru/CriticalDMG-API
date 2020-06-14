import {
  DataTypes,
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
} from "../declarations";
import { GameEngineModel } from "./gameEngines.model";
import { AssetModel } from "./assets.model";

export class CampaignTemplateModel extends CriticalDMGModel {
  name!: string;

  public getGameEngine!: BelongsToGetAssociationMixin<GameEngineModel>;
  public setGameEngine!: BelongsToSetAssociationMixin<
    CampaignTemplateModel,
    number
  >;

  public addAsset!: HasManyAddAssociationMixin<CampaignTemplateModel, number>;
  public getAsset!: HasManyGetAssociationsMixin<CampaignTemplateModel>;

  static associations: {
    gameEngine: Association<CampaignTemplateModel, GameEngineModel>;
    assets: Association<CampaignTemplateModel, AssetModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof CampaignTemplateModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  CampaignTemplateModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.CAMPAIGN_TEMPLATE,
      modelName: ModelName.CAMPAIGN_TEMPLATE,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  CampaignTemplateModel.associate = function (models) {
    this.hasMany(models[ModelName.CAMPAIGN]);
    this.belongsTo(models[ModelName.GAME_ENGINE]);
    this.hasMany(models[ModelName.ASSET]);
  };

  return CampaignTemplateModel;
}
