import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { SessionLogModel } from "../../models/sessionLogs.model";
import { SessionLogDto } from "./sessionLogs.dto";

export class SessionLogsService extends Service<SessionLogDto> {
  Model!: SessionLogModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
