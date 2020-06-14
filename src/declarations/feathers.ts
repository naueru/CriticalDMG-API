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
import { CampaignDTO } from "../services/campaigns/campaigns.dto";
import { CampaignService } from "../services/campaigns/campaigns.class";
import { CharacterDTO } from "../services/characters/characters.dto";
import { CharacterService } from "../services/characters/characters.class";
import { CampaignTemplateDTO } from "../services/campaignTemplates/campaignTemplates.dto";
import { CampaignTemplateService } from "../services/campaignTemplates/campaignTemplates.class";
import { GameEngineDTO } from "../services/gameEngines/gameEngines.dto";
import { GameEngineService } from "../services/gameEngines/gameEngines.class";
import { AssetDTO } from "../services/assets/assets.dto";
import { AssetService } from "../services/assets/assets.class";
import { EventDTO } from "../services/events/events.dto";
import { EventService } from "../services/events/events.class";
import { EventTemplateDTO } from "../services/eventTemplates/eventTemplates.dto";
import { EventTemplateService } from "../services/eventTemplates/eventTemplates.class";
import { RollDTO } from "../services/rolls/rolls.dto";
import { RollService } from "../services/rolls/rolls.class";
import { ChatMessageDTO } from "../services/chatMessages/chatMessages.dto";
import { ChatMessageService } from "../services/chatMessages/chatMessages.class";
// Don't remove this comment. It's needed to format import lines nicely.

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
  CHARACTERS = "characters",
  CAMPAIGN_TEMPLATES = "campaignTemplates",
  GAME_ENGINES = "gameEngines",
  ASSETS = "assets",
  EVENTS = "events",
  EVENT_TEMPLATES = "eventTemplates",
  ROLLS = "rolls",
  CHAT_MESSAGES = "chatMessages",
  // Don't remove this comment. It's needed to add service names names nicely.
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

  [ServiceName.AUTHENTICATION]: AuthenticationService & ServiceAddons<any>;

  [ServiceName.CAMPAIGNS]: CampaignService & ServiceAddons<CampaignDTO>;

  [ServiceName.CHARACTERS]: CharacterService & ServiceAddons<CharacterDTO>;

  [ServiceName.CHARACTERS]: CharacterService & ServiceAddons<CharacterDTO>;

  [ServiceName.CAMPAIGN_TEMPLATES]: CampaignTemplateService &
    ServiceAddons<CampaignTemplateDTO>;

  [ServiceName.GAME_ENGINES]: GameEngineService & ServiceAddons<GameEngineDTO>;

  [ServiceName.ASSETS]: AssetService & ServiceAddons<AssetDTO>;

  [ServiceName.EVENTS]: EventService & ServiceAddons<EventDTO>;

  [ServiceName.EVENT_TEMPLATES]: EventTemplateService &
    ServiceAddons<EventTemplateDTO>;

  [ServiceName.ROLLS]: RollService & ServiceAddons<RollDTO>;

  [ServiceName.CHAT_MESSAGES]: ChatMessageService &
    ServiceAddons<ChatMessageDTO>;

  // Don't remove this comment. It's needed to add service types names nicely.
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
