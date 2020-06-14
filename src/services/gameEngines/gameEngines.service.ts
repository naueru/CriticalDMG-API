import { Application, ServiceName, SettingName } from "../../declarations";
import { GameEngineService } from "./gameEngines.class";
import createModel from "../../models/gameEngines.model";
import hooks from "./gameEngines.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.GAME_ENGINES}`, new GameEngineService(options, app));

  const service = app.service(ServiceName.GAME_ENGINES);

  service.hooks(hooks);
}
