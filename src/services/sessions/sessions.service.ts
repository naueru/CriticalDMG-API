import { Application, ServiceName, SettingName } from "../../declarations";
import { SessionService } from "./sessions.class";
import Model from "../../models/sessions.model";
import hooks from "./sessions.hooks";

export default function (app: Application): void {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.SESSIONS}`, new SessionService(options));

  const service = app.service(ServiceName.SESSIONS);

  service.publish((data) => app.channel(`session/${data.id}`));

  service.hooks(hooks);
}
