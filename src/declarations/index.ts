export * from "./sequelize";
export * from "./feathers";
export * from "./constants";

export enum LogTypeEnum {
  EVENT = "event",
  MESSAGE = "message",
}

export interface Message {}

export interface Event {}

export type LogContent = Message | Event;

export type LogType = LogTypeEnum.EVENT | LogTypeEnum.MESSAGE;
