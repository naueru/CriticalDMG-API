import { Application, ServiceName, SettingName } from "../../declarations";
import { CampaignService } from "./campaigns.class";
import createModel from "../../models/campaigns.model";
import hooks from "./campaigns.hooks";

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(`/${ServiceName.CAMPAIGNS}`, new CampaignService(options, app));

  const service = app.service(ServiceName.CAMPAIGNS);

  service.hooks(hooks);
}
