import { Application, ServiceName, SettingName } from "../../declarations";
import { Rooms } from "./rooms.class";
import createModel from "../../models/room.model";
import hooks from "./rooms.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use("/rooms", new Rooms(options, app));

  const service = app.service(ServiceName.ROOMS);

  service.hooks(hooks);
}
