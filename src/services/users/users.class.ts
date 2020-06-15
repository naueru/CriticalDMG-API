import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { UserModel } from "../../models/users.model";

export class UsersService extends Service<UserModel> {
  Model!: UserModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
