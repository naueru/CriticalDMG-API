import { LogType, LogContent } from "../../declarations";

export interface SessionLogDto {
  type: LogType;
  data: LogContent;
  sessionId: number;
  createdAt: Date;
  updatedAt: Date;
}
