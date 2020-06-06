import { AuthenticationService, JWTStrategy } from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import { expressOauth } from "@feathersjs/authentication-oauth";

import { Application, ServiceName } from "./declarations";
import { Hook } from "@feathersjs/feathers";
import { FeathersError } from "@feathersjs/errors/";
import { ERROR_CODE } from "./declarations";

export class NotAuthenticated extends FeathersError {
  constructor(data: any) {
    super("Invalid login", "NotAuthenticated", 401, "not-authenticated", data);
  }
}

const handleBadCredentials: Hook<any> = (context) => {
  if (context.error?.message === "Invalid login") {
    context.error = new NotAuthenticated({ internalError: ERROR_CODE.BAD_CREDENTIALS });
  }
  return context;
};

const hooks = {
  error: {
    create: handleBadCredentials,
  },
};

export default function (app: Application) {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  app.use(`/${ServiceName.AUTHENTICATION}`, authentication);
  app.configure(expressOauth());

  // Get our initialized service so that we can register hooks
  const service = app.service(ServiceName.AUTHENTICATION);

  service.hooks(hooks);
}
