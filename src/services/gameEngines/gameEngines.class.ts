import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { GameEngineModel } from "../../models/gameEngines.model";
import { GameEngineDTO } from "./gameEngines.dto";

export class GameEngineService extends Service<GameEngineDTO> {
  Model!: GameEngineModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
