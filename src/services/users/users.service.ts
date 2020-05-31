// Initializes the `users` service on path `/users`
import { Application, ServiceName, SettingName } from "../../declarations";
import { UsersService } from "./users.class";
import createModel from "../../models/users.model";
import hooks from "./users.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  // Initialize our service with any options it requires
  app.use(`/${ServiceName.USERS}`, new UsersService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(ServiceName.USERS);

  service.hooks(hooks);
}
