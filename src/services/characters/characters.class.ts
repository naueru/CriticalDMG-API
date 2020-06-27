import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { CharacterModel } from "../../models/characters.model";
import { CharacterDTO } from "./characters.dto";

export class CharacterService extends Service<CharacterDTO> {
  Model!: CharacterModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
