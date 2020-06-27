import { ModelName } from "../declarations";
import { EventModel } from "./events.model";
import { Model, Column, Table, HasMany } from "sequelize-typescript";

@Table({
  tableName: ModelName.EVENT_TEMPLATE,
  modelName: ModelName.EVENT_TEMPLATE,
  timestamps: true,
})
export class EventTemplateModel extends Model<EventTemplateModel> {
  @Column
  command!: string;

  @HasMany(() => EventModel)
  events!: EventModel[];
}

export default EventTemplateModel;
