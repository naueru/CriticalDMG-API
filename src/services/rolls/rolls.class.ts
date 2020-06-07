import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { RollModel } from "../../models/rolls.model";
import { RollDTO } from "./rolls.dto";

export class RollService extends Service<RollDTO> {
  Model!: RollModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}