import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { RoomLogModel } from "../../models/roomLog.model";
import { RoomLogDto } from "./roomLogs.dto";

export class RoomLogsService extends Service<RoomLogDto> {
  Model!: RoomLogModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
