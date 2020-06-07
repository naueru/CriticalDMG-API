import { Application, ServiceName, SettingName } from "../../declarations";
import { RollService } from "./rolls.class";
import createModel from "../../models/rolls.model";
import hooks from "./rolls.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.ROLLS }`, new RollService(options, app));

  const service = app.service(ServiceName.ROLLS);

  service.hooks(hooks);
}