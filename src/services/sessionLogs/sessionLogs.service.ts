import { Application, ServiceName, SettingName } from "../../declarations";
import { SessionLogsService } from "./sessionLogs.class";
import Model from "../../models/sessionLogs.model";
import hooks from "./sessionLogs.hooks";

export default function (app: Application): void {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.SESSION_LOGS}`, new SessionLogsService(options));

  const service = app.service(ServiceName.SESSION_LOGS);

  service.publish("created", (data) => app.channel(`session/${data.sessionId}`));

  service.hooks(hooks);
}
