import { Model, Sequelize } from "sequelize";
import { UserModel } from "../models/users.model";
import { RoomModel } from "../models/room.model";
import { RoomLogModel } from "../models/roomLog.model";

/**
 * Model names available on sequelize
 */
export enum ModelName {
  USER = "user",
  ROOM = "room",
  ROOM_LOG = "room_log",
  USER_ROOM = "user_room",
}

/**
 * Model available on sequelize.models
 * Add here the new models for better typing
 */
export type Models = {
  [ModelName.USER]: ModelCtor<UserModel>;
  [ModelName.ROOM]: ModelCtor<RoomModel>;
  [ModelName.ROOM_LOG]: ModelCtor<RoomLogModel>;
};

/**
 * Custom Model to add static method associate used to add references to other models
 */
export abstract class CriticalDMGModel<T = any, T2 = any> extends Model<T, T2> {
  static associate?: (models: Models) => void;
}

/**
 * Custom Sequelize for sequelize intance to have our Model implementation
 */
export class CriticalDMGSequelize extends Sequelize {
  /**
   * Dictionary of all models linked with this instance.
   */
  readonly models!: Models;
}

export type ModelType = typeof CriticalDMGModel;

export type ModelCtor<M extends CriticalDMGModel> = { new (): M } & ModelType;
