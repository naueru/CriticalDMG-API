import { ModelName } from "../declarations";
import { SessionModel } from "./sessions.model";
import { UserModel } from "./users.model";
import { CharacterModel } from "./characters.model";
import { CampaignTemplateModel } from "./campaignTemplates.model";
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
  tableName: ModelName.CAMPAIGN,
  modelName: ModelName.CAMPAIGN,
  timestamps: true,
})
export class CampaignModel extends Model<CampaignModel> {
  @Column
  public name!: string;

  @HasMany(() => SessionModel)
  session!: SessionModel[];

  // disable for now
  /*
  @HasMany(() => CharacterModel)
  npcs!: CharacterModel[];
  */

  @HasMany(() => CharacterModel)
  players!: CharacterModel[];

  @BelongsTo(() => UserModel)
  owner!: UserModel;

  @ForeignKey(() => UserModel)
  @Column
  ownerId!: number;

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

export default CampaignModel;
