import { Application, ServiceName, SettingName } from "../../declarations";
import { AssetService } from "./assets.class";
import Model from "../../models/assets.model";
import hooks from "./assets.hooks";

export default function (app: Application): void {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.ASSETS}`, new AssetService(options));

  const service = app.service(ServiceName.ASSETS);

  service.hooks(hooks);
}
