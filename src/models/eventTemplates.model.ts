import { ModelName } from "../declarations";
import { EventModel } from "./events.model";
import {
  Model,
  Column,
  Table,
  BeforeCount,
  HasMany,
} from "sequelize-typescript";

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

  @BeforeCount
  static setToRaw(options: any) {
    options.raw = true;
  }
}

export default EventTemplateModel;
