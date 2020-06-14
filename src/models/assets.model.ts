import { ModelName } from "../declarations";
import { CampaignTemplateModel } from "./campaignTemplates.model";
import {
  Model,
  Column,
  Table,
  BeforeCount,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";

@Table({
  tableName: ModelName.ASSET,
  modelName: ModelName.ASSET,
  timestamps: true,
})
export class AssetModel extends Model<AssetModel> {
  @Column
  url!: string;

  @BelongsTo(() => CampaignTemplateModel)
  template!: CampaignTemplateModel;

  @ForeignKey(() => CampaignTemplateModel)
  @Column
  templateId!: number;

  @BeforeCount
  static setToRaw(options: any) {
    options.raw = true;
  }
}

export default AssetModel;
