import { ModelName } from "../declarations";
import { CampaignTemplateModel } from "./campaignTemplates.model";
import { Model, Column, Table, HasMany } from "sequelize-typescript";

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
}

export default GameEngineModel;
