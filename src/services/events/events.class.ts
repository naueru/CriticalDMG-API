import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { EventModel } from "../../models/events.model";
import { EventDTO } from "./events.dto";

export class EventService extends Service<EventDTO> {
  Model!: EventModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
