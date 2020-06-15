import { AuthenticationService, JWTStrategy } from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import { expressOauth } from "@feathersjs/authentication-oauth";

import { Application, ServiceName, HookContext } from "./declarations";
import { Hook } from "@feathersjs/feathers";
import { FeathersError } from "@feathersjs/errors/";
import { ERROR_CODE } from "./declarations";
import { UserDTO } from "./services/users/users.dto";

export interface AuthenticationDto extends UserDTO {
  accessToken: string;
  authentication: {
    strategy: string;
  };
  user: UserDTO;
}

export interface ErrorData {
  internalError: ERROR_CODE;
}

export class NotAuthenticated extends FeathersError {
  constructor(data: ErrorData) {
    super("Invalid login", "NotAuthenticated", 401, "not-authenticated", data);
  }
}

const handleBadCredentials: Hook<AuthenticationDto> = (context: HookContext) => {
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

export default function (app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  app.use(`/${ServiceName.AUTHENTICATION}`, authentication);
  app.configure(expressOauth());

  // Get our initialized service so that we can register hooks
  const service = app.service(ServiceName.AUTHENTICATION);

  service.hooks(hooks);
}
