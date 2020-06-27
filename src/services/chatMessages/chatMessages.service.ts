import { Application, ServiceName, SettingName } from "../../declarations";
import { ChatMessageService } from "./chatMessages.class";
import Model from "../../models/chatMessages.model";
import hooks from "./chatMessages.hooks";

export default function (app: Application): void {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.CHAT_MESSAGES}`, new ChatMessageService(options));

  const service = app.service(ServiceName.CHAT_MESSAGES);

  service.hooks(hooks);
}
