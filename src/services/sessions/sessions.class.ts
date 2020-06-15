import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { SessionModel } from "../../models/sessions.model";
import { SessionDTO } from "./sessions.dto";

export class SessionService extends Service<SessionDTO> {
  Model!: SessionModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  public async addPlayerToSession(sessionId: number, userId: number) {
    const returnModelInstance = {
      sequelize: { raw: false },
    };
    const session = ((await this.get(
      sessionId,
      returnModelInstance
    )) as unknown) as SessionModel;

    // TODO uncomment this
    // session.addPlayer(userId);
    return session.save();
  }
}
