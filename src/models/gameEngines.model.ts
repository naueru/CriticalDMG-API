import { DataTypes, Association } from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
} from "../declarations";
import { CampaignTemplateModel } from "./campaignTemplates.model";

export class GameEngineModel extends CriticalDMGModel {
  name!: string;

  public static associations: {
    templates: Association<GameEngineModel, CampaignTemplateModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof GameEngineModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  GameEngineModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.GAME_ENGINE,
      modelName: ModelName.GAME_ENGINE,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  GameEngineModel.associate = function (models) {
    this.hasMany(models[ModelName.CAMPAIGN_TEMPLATE]);
  };

  return GameEngineModel;
}
