import { ModelName } from "../declarations";
import { GameEngineModel } from "./gameEngines.model";
import { AssetModel } from "./assets.model";

import { CampaignModel } from "./campaigns.model";
import {
  Model,
  Column,
  Table,
  BeforeCount,
  BelongsTo,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";

@Table({
  tableName: ModelName.CAMPAIGN_TEMPLATE,
  modelName: ModelName.CAMPAIGN_TEMPLATE,
  timestamps: true,
})
export class CampaignTemplateModel extends Model<CampaignTemplateModel> {
  @Column
  name!: string;

  @HasMany(() => CampaignModel)
  capaigns!: CampaignModel[];

  @HasMany(() => AssetModel)
  assets!: AssetModel[];

  @BelongsTo(() => GameEngineModel)
  gameEngine!: GameEngineModel;

  @ForeignKey(() => GameEngineModel)
  @Column
  gameEngineId!: number;

  @BeforeCount
  static setToRaw(options: any) {
    options.raw = true;
  }
}

export default CampaignTemplateModel;
