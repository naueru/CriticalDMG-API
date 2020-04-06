import { Application, ServiceName, SettingName } from "../../declarations";
import { RoomLogs } from "./roomLogs.class";
import createModel from "../../models/roomLog.model";
import hooks from "./roomsLogs.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use("/roomLogs", new RoomLogs(options, app));

  const service = app.service(ServiceName.ROOMS);

  service.hooks(hooks);
}
