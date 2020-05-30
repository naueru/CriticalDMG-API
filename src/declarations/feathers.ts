import { CriticalDMGSequelize } from "./sequelize";
import { ServiceAddons } from "@feathersjs/feathers";
import { Application as ExpressFeathers } from "@feathersjs/express";
import { UsersService } from "../services/users/users.class";
import { AuthenticationService } from "@feathersjs/authentication/lib";
import { SessionService } from "../services/sessions/sessions.class";
import { SessionLogDto } from "../services/sessionLogs/sessionLogs.dto";
import { UserDTO } from "../services/users/users.dto";
import { SessionDTO } from "../services/sessions/sessions.dto";
import { RealTimeConnection } from "@feathersjs/transport-commons/lib/channels/channel/base";
import { SessionLogsService } from "../services/sessionLogs/sessionLogs.class";
import { SessionSubscriptionsService } from "../services/sessionSubscriptions/sessionSubscriptions.class";
import { CampaignDTO } from "../services/campaign/campaigns.dto";
import { CampaignService } from "../services/campaign/campaigns.class";

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
  SESSIONS = "sessions",
  SESSION_LOGS = "sessionLogs",
  SESSION_SUBSCRIPTIONS = "sessionSubscriptions",
  CAMPAIGNS = "campaigns",
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

  [ServiceName.SESSIONS]: SessionService & ServiceAddons<SessionDTO>;

  [ServiceName.SESSION_LOGS]: SessionLogsService & ServiceAddons<SessionLogDto>;

  [ServiceName.SESSION_SUBSCRIPTIONS]: SessionSubscriptionsService &
    ServiceAddons<any>;

  [ServiceName.AUTHENTICATION]: AuthenticationService &
    ServiceAddons<SessionLogDto>;

  [ServiceName.CAMPAIGNS]: CampaignService & ServiceAddons<CampaignDTO>;
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
