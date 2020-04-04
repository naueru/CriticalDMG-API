import { Model, ModelCtor, Sequelize } from "sequelize";
import { UserModel } from "../models/users.model";

/**
 * Model names available on sequelize
 */
export enum ModelName {
  USER = "user",
}

export type Models = {
  [ModelName.USER]: ModelCtor<UserModel>;
};

/**
 * Module augmentation to merge declarations
 */
declare module "sequelize" {
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
