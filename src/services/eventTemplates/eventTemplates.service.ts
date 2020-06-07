import { Application, ServiceName, SettingName } from "../../declarations";
import { EventTemplateService } from "./eventTemplates.class";
import createModel from "../../models/eventTemplates.model";
import hooks from "./eventTemplates.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.EVENT_TEMPLATES }`, new EventTemplateService(options, app));

  const service = app.service(ServiceName.EVENT_TEMPLATES);

  service.hooks(hooks);
}