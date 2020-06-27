import { ModelName } from "../declarations";
import { UserModel } from "./users.model";
import { CampaignModel } from "./campaigns.model";
import { RollModel } from "./rolls.model";
import { ChatMessageModel } from "./chatMessages.model";
import { Model, Column, Table, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";

@Table({
  tableName: ModelName.CHARACTER,
  modelName: ModelName.CHARACTER,
  timestamps: true,
})
export class CharacterModel extends Model<CharacterModel> {
  @Column
  name!: string;

  @HasMany(() => RollModel)
  rolls!: RollModel[];

  @HasMany(() => ChatMessageModel)
  chatMessages!: ChatMessageModel[];

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @ForeignKey(() => UserModel)
  @Column
  userId!: number;

  @BelongsTo(() => CampaignModel)
  campaign!: CampaignModel;

  @ForeignKey(() => CampaignModel)
  @Column
  campaignId!: number;
}

export default CharacterModel;
