import { Application, ServiceName, SettingName } from "../../declarations";
import { SessionLogsService } from "./sessionLogs.class";
import createModel from "../../models/sessionLogs.model";
import hooks from "./sessionLogs.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use("/sessionLogs", new SessionLogsService(options, app));

  const service = app.service(ServiceName.SESSION_LOGS);

  service.publish("created", (data) =>
    app.channel(`session/${data.sessionId}`)
  );

  service.hooks(hooks);
}
