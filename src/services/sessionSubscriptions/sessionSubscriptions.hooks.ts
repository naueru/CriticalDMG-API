import { authenticate } from "@feathersjs/authentication";
import { Hook, HooksObject } from "@feathersjs/feathers";
import { SessionSubscriptionDto } from "./sessionSubscriptions.dto";
// Don't remove this comment. It's needed to format import lines nicely.

const setUserToSubscribe: Hook<SessionSubscriptionDto> = (context) => {
  if (context.params.user && context.data) {
    context.data = {
      ...context.data,
      player: context.params.user.id,
    };
  }
};

const mustBeBySocket: Hook<SessionSubscriptionDto> = (context) => {
  if (context.params.provider !== "socketio") {
    throw new Error("Service must be called via socket");
  }
};

const joinSessionChannel: Hook<SessionSubscriptionDto> = (context) => {
  if (context.params.connection) {
    context.app
      .channel(`session/${context.data?.sessionId}`)
      .join(context.params.connection);
  }
};

const hooks: Partial<HooksObject<SessionSubscriptionDto>> = {
  before: {
    all: [authenticate("jwt"), mustBeBySocket],
    create: [setUserToSubscribe],
  },

  after: {
    create: [joinSessionChannel],
  },
};

export default hooks;
