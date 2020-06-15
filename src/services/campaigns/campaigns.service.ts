import { Application, ServiceName, SettingName } from "../../declarations";
import { CampaignService } from "./campaigns.class";
import Model from "../../models/campaigns.model";
import hooks from "./campaigns.hooks";

export default function (app: Application): void {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };
  app.get<SettingName.PAGINATE>(SettingName.PAGINATE);
  app.use(`/${ServiceName.CAMPAIGNS}`, new CampaignService(options));

  const service = app.service(ServiceName.CAMPAIGNS);

  service.hooks(hooks);
}
