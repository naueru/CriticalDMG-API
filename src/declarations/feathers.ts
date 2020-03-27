import { CriticalDMGSequelize } from "./sequelize";
import { Application as ExpressFeathers } from "@feathersjs/express";
import { Sequelize, Model } from "sequelize/types";

// A mapping of service names to types. Will be extended in service files.
export enum ServiceName {
  SEQUELIZE = "sequelizeClient",
  POSTGRES = "postgres",
  SEQUELIZE_SYNC = "sequelizeSync"
}

export interface ServiceTypes {
  /**
   * Sequelize instance wrapper with specific Critical DMG logic
   */
  [ServiceName.SEQUELIZE]: CriticalDMGSequelize;

  /**
   * Postgres connection url
   */
  [ServiceName.POSTGRES]: string;

  /**
   * Sequelize.sync promise result
   */
  [ServiceName.SEQUELIZE_SYNC]: Promise<CriticalDMGSequelize>;
}
// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes>;
