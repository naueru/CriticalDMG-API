import { Application, ServiceName, SettingName } from "../../declarations";
import { SessionService } from "./sessions.class";
import createModel from "../../models/sessions.model";
import hooks from "./sessions.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use("/sessions", new SessionService(options, app));

  const service = app.service(ServiceName.SESSION);

  service.publish((data) => app.channel(`session/${data.id}`));

  service.hooks(hooks);
}
