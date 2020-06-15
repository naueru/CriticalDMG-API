import { ModelName } from "../declarations";
import { SessionModel } from "./sessions.model";
import { EventTemplateModel } from "./eventTemplates.model";
import { Model, Column, Table, BelongsTo, ForeignKey } from "sequelize-typescript";

@Table({
  tableName: ModelName.EVENT,
  modelName: ModelName.EVENT,
  timestamps: true,
})
export class EventModel extends Model<EventModel> {
  //TODO rename
  @Column
  name!: string;

  @BelongsTo(() => SessionModel)
  session!: SessionModel;

  @ForeignKey(() => SessionModel)
  @Column
  sessionId!: number;

  @BelongsTo(() => EventTemplateModel)
  template!: EventTemplateModel;

  @ForeignKey(() => EventTemplateModel)
  @Column
  templateId!: number;
}

export default EventModel;
