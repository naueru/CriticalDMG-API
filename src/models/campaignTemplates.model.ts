import { DataTypes, Association, HasManyAddAssociationMixin } from "sequelize";
import { ModelName, SettingName, CriticalDMGModel, Application } from "../declarations";
import { CampaignModel } from "./campaigns.model";

export class CampaignTemplateModel extends CriticalDMGModel {
  name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (app: Application): typeof CampaignTemplateModel {
  const sequelize = app.get(SettingName.SEQUELIZE);
  CampaignTemplateModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
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
    this.hasMany(models[ModelName.CAMPAIGN_TEMPLATE]);
  };

  return CampaignTemplateModel;
}
