import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { EventModel } from "../../models/events.model";
import { EventDTO } from "./events.dto";

export class EventService extends Service<EventDTO> {
  Model!: EventModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
