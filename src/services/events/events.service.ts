import { Application, ServiceName, SettingName } from "../../declarations";
import { EventService } from "./events.class";
import createModel from "../../models/events.model";
import hooks from "./events.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.EVENTS }`, new EventService(options, app));

  const service = app.service(ServiceName.EVENTS);

  service.hooks(hooks);
}