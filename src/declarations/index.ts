export * from "./sequelize";
export * from "./feathers";

export enum LogTypeEnum {
  EVENT = "event",
  MESSAGE = "message",
}

export interface Message {}

export interface Event {}

export type LogData = Message | Event;

export type LogType = LogTypeEnum.EVENT | LogTypeEnum.MESSAGE;
