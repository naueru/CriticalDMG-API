import { Model, ModelCtor, Sequelize } from "sequelize/types";
import { UserModel } from "../models/users.model";

/**
 * Model names available on sequelize
 */
export enum ModelName {
  USERS = "users"
}

/**
 * Module augmentation to merge declarations
 */
declare module "sequelize/types" {
  abstract class Model {
    static associate?: (a: Models) => void;
  }
}
export class CriticalDMGSequelize extends Sequelize {
  /**
   * Dictionary of all models linked with this instance.
   */
  readonly models!: {
    [ModelName.USERS]: ModelCtor<UserModel>;
  };
}

export type Models = {
  [N in ModelName]: ModelCtor<Model>;
};

export type ModelType = typeof Model;
