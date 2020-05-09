import { Application, ServiceName, SettingName } from "../../declarations";
import { RoomSubscriptionsService } from "./roomSubscriptions.class";
import hooks from "./roomSubscriptions.hooks";

export default function (app: Application) {
  app.use("/roomSubscriptions", new RoomSubscriptionsService(app));

  const service = app.service(ServiceName.ROOM_SUBSCRIPTIONS);

  service.hooks(hooks);
}
