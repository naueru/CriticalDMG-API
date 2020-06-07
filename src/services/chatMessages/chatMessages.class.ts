import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { ChatMessageModel } from "../../models/chatMessages.model";
import { ChatMessageDTO } from "./chatMessages.dto";

export class ChatMessageService extends Service<ChatMessageDTO> {
  Model!: ChatMessageModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}