import { Application, ServiceName, SettingName } from "../../declarations";
import { CharacterService } from "./characters.class";
import Model from "../../models/characters.model";
import hooks from "./characters.hooks";

export default function (app: Application) {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.CHARACTERS}`, new CharacterService(options, app));

  const service = app.service(ServiceName.CHARACTERS);

  service.hooks(hooks);
}
