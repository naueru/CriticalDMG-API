import { Model, ModelCtor, Sequelize } from "sequelize/types";
import { UserModel } from "../models/users.model";

/**
 * Model names available on sequelize
 */
export enum ModelName {
  USERS = "users"
}

export type Models = {
  [ModelName.USERS]: ModelCtor<UserModel>;
};

/**
 * Module augmentation to merge declarations
 */
declare module "sequelize/types" {
  abstract class Model {
    static associate?: (models: Models) => void;
  }
}
export class CriticalDMGSequelize extends Sequelize {
  /**
   * Dictionary of all models linked with this instance.
   */
  readonly models!: Models;
}

export type ModelType = typeof Model;
