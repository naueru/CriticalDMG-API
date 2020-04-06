import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { RoomLogModel } from "../../models/roomLog.model";

export class RoomLogs extends Service<RoomLogModel> {
  Model!: RoomLogModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
