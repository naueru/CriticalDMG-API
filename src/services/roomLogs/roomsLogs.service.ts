import { Application, ServiceName, SettingName } from "../../declarations";
import { RoomLogsService } from "./roomLogs.class";
import createModel from "../../models/roomLog.model";
import hooks from "./roomsLogs.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use("/roomLogs", new RoomLogsService(options, app));

  const service = app.service(ServiceName.ROOM_LOGS);

  service.publish("created", (data) => app.channel(`room/${data.roomId}`));

  service.hooks(hooks);
}
