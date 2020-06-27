import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { EventTemplateModel } from "../../models/eventTemplates.model";
import { EventTemplateDTO } from "./eventTemplates.dto";

export class EventTemplateService extends Service<EventTemplateDTO> {
  Model!: EventTemplateModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
