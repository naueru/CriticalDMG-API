import { Application, ServiceName, SettingName } from "../../declarations";
import { CharacterService } from "./characters.class";
import createModel from "../../models/characters.model";
import hooks from "./characters.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.CHARACTERS }`, new CharacterService(options, app));

  const service = app.service(ServiceName.CHARACTERS);

  service.hooks(hooks);
}