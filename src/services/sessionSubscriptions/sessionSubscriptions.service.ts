import { Application, ServiceName, SettingName } from "../../declarations";
import { SessionSubscriptionsService } from "./sessionSubscriptions.class";
import hooks from "./sessionSubscriptions.hooks";

export default function (app: Application) {
  app.use(
    `/${ServiceName.SESSION_SUBSCRIPTIONS}`,
    new SessionSubscriptionsService(app)
  );

  const service = app.service(ServiceName.SESSION_SUBSCRIPTIONS);

  service.hooks(hooks);
}
