import { LogType, LogContent } from "../../declarations";

export interface RoomLogDto {
  type: LogType;
  data: LogContent;
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
}
