import { CriticalDMGSequelize } from "./sequelize";
import { ServiceAddons } from "@feathersjs/feathers";
import { Application as ExpressFeathers } from "@feathersjs/express";
import { UsersService } from "../services/users/users.class";
import { AuthenticationService } from "@feathersjs/authentication/lib";
import { RoomsService } from "../services/rooms/rooms.class";
import { RoomLogDto } from "../services/roomLogs/roomLogs.dto";
import { UserDTO } from "../services/users/users.dto";
import { RoomDTO } from "../services/rooms/rooms.dto";
import { RealTimeConnection } from "@feathersjs/transport-commons/lib/channels/channel/base";

export enum SettingName {
  SEQUELIZE = "sequelizeClient",
  DATABASE_CONFIGURATION = "DATABASE_CONFIGURATION",
  SEQUELIZE_SYNC = "sequelizeSync",
  PAGINATE = "paginate",
  PUBLIC_PATH = "public",
  PORT = "port",
  HOST = "host",
}

export enum ServiceName {
  USERS = "users",
  AUTHENTICATION = "authentication",
  ROOMS = "rooms",
  ROOM_LOGS = "roomLogs",
  ROOM_SUBSCRIPTIONS = "roomSubscriptions",
}

export interface DatabaseConfiguration {
  NAME: string;
  USERNAME: string;
  PASSWORD: string;
  HOST: string;
  PORT: number;
  DIALECT: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
}

export interface SettingTypes {
  /**
   * Sequelize instance wrapper with specific Critical DMG logic
   */
  [SettingName.SEQUELIZE]: CriticalDMGSequelize;

  /**
   * Postgres configuration data
   */
  [SettingName.DATABASE_CONFIGURATION]: DatabaseConfiguration;

  /**
   * Sequelize.sync promise result
   */
  [SettingName.SEQUELIZE_SYNC]: Promise<CriticalDMGSequelize>;

  /**
   * Sequelize.sync promise result
   */
  [SettingName.PAGINATE]: Pagination;

  /**
   * Path where the public assets will reside
   */
  [SettingName.PUBLIC_PATH]: string;

  /**
   * Application port where it'll listen
   */
  [SettingName.PORT]: string;

  /**
   * Host
   */
  [SettingName.HOST]: string;
}

export interface ServiceTypes {
  [ServiceName.USERS]: UsersService & ServiceAddons<any>;

  [ServiceName.ROOMS]: RoomsService & ServiceAddons<RoomDTO>;

  [ServiceName.ROOM_LOGS]: RoomsService & ServiceAddons<RoomLogDto>;

  [ServiceName.ROOM_SUBSCRIPTIONS]: RoomsService & ServiceAddons<any>;

  [ServiceName.AUTHENTICATION]: AuthenticationService &
    ServiceAddons<RoomLogDto>;
}

export type Pagination = void | { default: number; max: number };

declare module "@feathersjs/feathers" {
  export interface Application<ServiceTypes = {}> {
    get<T extends keyof SettingTypes>(name: T): SettingTypes[T];

    set<T extends keyof SettingTypes>(name: T, value: SettingTypes[T]): this;
  }

  export interface Params {
    user?: UserDTO;
    connection?: RealTimeConnection;
  }
}

export type Application = ExpressFeathers<ServiceTypes>;
