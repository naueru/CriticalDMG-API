import { Application, ServiceName, SettingName } from "../../declarations";
import { EventService } from "./events.class";
import Model from "../../models/events.model";
import hooks from "./events.hooks";

export default function (app: Application): void {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.EVENTS}`, new EventService(options));

  const service = app.service(ServiceName.EVENTS);

  service.hooks(hooks);
}
