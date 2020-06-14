import { ModelName } from "../declarations";
import { CampaignTemplateModel } from "./campaignTemplates.model";
import {
  Model,
  Column,
  Table,
  BeforeCount,
  HasMany,
} from "sequelize-typescript";

@Table({
  tableName: ModelName.GAME_ENGINE,
  modelName: ModelName.GAME_ENGINE,
  timestamps: true,
})
export class GameEngineModel extends Model<GameEngineModel> {
  @Column
  name!: string;

  @HasMany(() => CampaignTemplateModel)
  templates!: CampaignTemplateModel[];

  @BeforeCount
  static setToRaw(options: any) {
    options.raw = true;
  }
}

export default GameEngineModel;
