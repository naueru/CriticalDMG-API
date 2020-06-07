import { Application, ServiceName, SettingName } from "../../declarations";
import { ChatMessageService } from "./chatMessages.class";
import createModel from "../../models/chatMessages.model";
import hooks from "./chatMessages.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.CHAT_MESSAGES }`, new ChatMessageService(options, app));

  const service = app.service(ServiceName.CHAT_MESSAGES);

  service.hooks(hooks);
}