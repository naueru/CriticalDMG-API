import { Application, ServiceName, SettingName } from "../../declarations";
import { CampaignTemplateService } from "./campaignTemplates.class";
import Model from "../../models/campaignTemplates.model";
import hooks from "./campaignTemplates.hooks";

export default function (app: Application) {
  const options = {
    Model,
    paginate: app.get(SettingName.PAGINATE),
  };

  app.use(
    `/${ServiceName.CAMPAIGN_TEMPLATES}`,
    new CampaignTemplateService(options, app)
  );

  const service = app.service(ServiceName.CAMPAIGN_TEMPLATES);

  service.hooks(hooks);
}
