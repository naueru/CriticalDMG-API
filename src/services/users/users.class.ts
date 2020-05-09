import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { UserModel } from "../../models/users.model";

export class UsersService extends Service<UserModel> {
  Model!: UserModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
