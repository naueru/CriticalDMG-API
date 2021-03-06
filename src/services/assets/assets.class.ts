import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { AssetModel } from "../../models/assets.model";
import { AssetDTO } from "./assets.dto";

export class AssetService extends Service<AssetDTO> {
  Model!: AssetModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
