import { ModelName } from "../declarations";
import { Table, Column, Model, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { EventModel } from "./events.model";
import { SessionLogModel } from "./sessionLogs.model";
import { RollModel } from "./rolls.model";
import { ChatMessageModel } from "./chatMessages.model";
import { CampaignModel } from "./campaigns.model";

@Table({
  tableName: ModelName.SESSION,
  modelName: ModelName.SESSION,
  timestamps: true,
})
export class SessionModel extends Model<SessionModel> {
  @Column
  name!: string;

  @HasMany(() => SessionLogModel)
  log!: SessionLogModel[];

  @HasMany(() => EventModel)
  events!: EventModel[];

  @HasMany(() => RollModel)
  rolls!: EventModel[];

  @HasMany(() => ChatMessageModel)
  messages!: EventModel[];

  @BelongsTo(() => CampaignModel)
  campaign!: EventModel[];

  @ForeignKey(() => CampaignModel)
  @Column
  campaignId!: number;
}

export default SessionModel;
