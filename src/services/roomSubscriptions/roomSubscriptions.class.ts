import { ServiceMethods as Service } from "@feathersjs/feathers";
import { Application, ServiceName } from "../../declarations";
import { RoomsService } from "../rooms/rooms.class";
import { RoomSubscriptionDto } from "./roomSubscriptionDto";

export class RoomSubscriptionsService
  implements Partial<Service<RoomSubscriptionDto>> {
  private roomService!: RoomsService;

  constructor(app: Application) {
    this.roomService = app.services[ServiceName.ROOMS];
  }

  async create(data: RoomSubscriptionDto) {
    await this.roomService.addPlayerToRoom(data.roomId, data.player);
    return data;
  }
}
