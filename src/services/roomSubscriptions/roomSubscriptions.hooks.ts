import { authenticate } from "@feathersjs/authentication";
import { Hook, HooksObject } from "@feathersjs/feathers";
import { RoomSubscriptionDto } from "./roomSubscriptionDto";
// Don't remove this comment. It's needed to format import lines nicely.

const setUserToSubscribe: Hook<RoomSubscriptionDto> = (context) => {
  if (context.params.user && context.data) {
    context.data = {
      ...context.data,
      player: context.params.user.id,
    };
  }
};

const mustBeBySocket: Hook<RoomSubscriptionDto> = (context) => {
  if (context.params.provider !== "socketio") {
    throw new Error("Service must be called via socket");
  }
};

const joinRoomChannel: Hook<RoomSubscriptionDto> = (context) => {
  if (context.params.connection) {
    context.app
      .channel(`room/${context.data?.roomId}`)
      .join(context.params.connection);
  }
};

const hooks: Partial<HooksObject<RoomSubscriptionDto>> = {
  before: {
    all: [authenticate("jwt"), mustBeBySocket],
    create: [setUserToSubscribe],
  },

  after: {
    create: [joinRoomChannel],
  },
};

export default hooks;
