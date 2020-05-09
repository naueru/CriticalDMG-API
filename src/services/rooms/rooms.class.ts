import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { RoomModel } from "../../models/room.model";
import { RoomDTO } from "./rooms.dto";

export class RoomsService extends Service<RoomDTO> {
  Model!: RoomModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  public async addPlayerToRoom(roomId: number, userId: number) {
    const returnModelInstance = {
      sequelize: { raw: false },
    };
    const room = ((await this.get(
      roomId,
      returnModelInstance
    )) as unknown) as RoomModel;

    room.addPlayer(userId);
    return room.save();
  }
}
