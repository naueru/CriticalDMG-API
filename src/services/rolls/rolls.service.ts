import { Application, ServiceName, SettingName } from "../../declarations";
import { RollService } from "./rolls.class";
import Model from "../../models/rolls.model";
import hooks from "./rolls.hooks";

export default function (app: Application): void {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.ROLLS}`, new RollService(options));

  const service = app.service(ServiceName.ROLLS);

  service.hooks(hooks);
}
