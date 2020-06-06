import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { CharacterModel } from "../../models/characters.model";
import { CharacterDTO } from "./characters.dto";

export class CharacterService extends Service<CharacterDTO> {
  Model!: CharacterModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}