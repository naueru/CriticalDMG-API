import { Application, ServiceName, SettingName } from "../../declarations";
import { RoomsService } from "./rooms.class";
import createModel from "../../models/room.model";
import hooks from "./rooms.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use("/rooms", new RoomsService(options, app));

  const service = app.service(ServiceName.ROOMS);

  service.publish((data) => app.channel(`room/${data.id}`));

  service.hooks(hooks);
}
