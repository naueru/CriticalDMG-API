import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { ChatMessageModel } from "../../models/chatMessages.model";
import { ChatMessageDTO } from "./chatMessages.dto";

export class ChatMessageService extends Service<ChatMessageDTO> {
  Model!: ChatMessageModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
