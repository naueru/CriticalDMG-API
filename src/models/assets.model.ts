import { DataTypes, Association } from "sequelize";
import {
  ModelName,
  SettingName,
  CriticalDMGModel,
  Application,
} from "../declarations";
import { CampaignTemplateModel } from "./campaignTemplates.model";

export class AssetModel extends CriticalDMGModel {
  url!: string;

  static associations: {
    template: Association<AssetModel, CampaignTemplateModel>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof AssetModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  AssetModel.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: ModelName.ASSET,
      modelName: ModelName.ASSET,
      hooks: {
        beforeCount(options: any) {
          options.raw = true;
        },
      },
    }
  );

  AssetModel.associate = function (models) {
    this.belongsTo(models[ModelName.CAMPAIGN_TEMPLATE]);
  };

  return AssetModel;
}
