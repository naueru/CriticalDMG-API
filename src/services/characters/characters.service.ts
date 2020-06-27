import { Application, ServiceName, SettingName } from "../../declarations";
import { CharacterService } from "./characters.class";
import Model from "../../models/characters.model";
import hooks from "./characters.hooks";

export default function (app: Application): void {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.CHARACTERS}`, new CharacterService(options));

  const service = app.service(ServiceName.CHARACTERS);

  service.hooks(hooks);
}
