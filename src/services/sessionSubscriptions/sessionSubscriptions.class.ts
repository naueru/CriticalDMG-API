import { ServiceMethods as Service } from "@feathersjs/feathers";
import { Application, ServiceName } from "../../declarations";
import { SessionService } from "../sessions/sessions.class";
import { SessionSubscriptionDto } from "./sessionSubscriptions.dto";

export class SessionSubscriptionsService implements Partial<Service<SessionSubscriptionDto>> {
  private sessionService!: SessionService;

  constructor(app: Application) {
    this.sessionService = app.services[ServiceName.SESSIONS];
  }

  async create(data: SessionSubscriptionDto): Promise<SessionSubscriptionDto> {
    await this.sessionService.addPlayerToSession(data.sessionId, data.player);
    return data;
  }
}
