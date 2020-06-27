import { Application, ServiceName, SettingName } from "../../declarations";
import { EventTemplateService } from "./eventTemplates.class";
import Model from "../../models/eventTemplates.model";
import hooks from "./eventTemplates.hooks";

export default function (app: Application): void {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.EVENT_TEMPLATES}`, new EventTemplateService(options));

  const service = app.service(ServiceName.EVENT_TEMPLATES);

  service.hooks(hooks);
}
