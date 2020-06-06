import * as feathersAuthentication from "@feathersjs/authentication";
import * as local from "@feathersjs/authentication-local";
import { UserDTO } from "./users.dto";
import { Hook } from "@feathersjs/feathers";
import { ERROR_CODE } from "../../declarations/constants";
const { FeathersError } = require("@feathersjs/errors");
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

const handleCreationError: Hook<UserDTO> = (context) => {
  const notUniqueError = context.error.errors.find((e: any) => e.validatorKey === "not_unique");
  if (notUniqueError) {
    const isMailNotUnique = notUniqueError.path === "email";
    const internalError = isMailNotUnique ? ERROR_CODE.MAIL_ALREADY_IN_USE : ERROR_CODE.USERNAME_ALREADY_IN_USE;
    context.error.data.internalError = internalError;
  }
  return context;
};

export default {
  before: {
    all: [],
    find: [
      /*TODO add authentication authenticate("jwt")*/
    ],
    get: [authenticate("jwt")],
    create: [hashPassword("password")],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [handleCreationError],
    update: [handleCreationError],
    patch: [handleCreationError],
    remove: [],
  },
};
