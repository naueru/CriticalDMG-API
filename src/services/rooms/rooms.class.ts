import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { RoomModel } from "../../models/room.model";

export class Rooms extends Service<RoomModel> {
  Model!: RoomModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
