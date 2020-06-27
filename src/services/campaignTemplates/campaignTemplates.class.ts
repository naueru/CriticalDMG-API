import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { CampaignTemplateModel } from "../../models/campaignTemplates.model";
import { CampaignTemplateDTO } from "./campaignTemplates.dto";

export class CampaignTemplateService extends Service<CampaignTemplateDTO> {
  Model!: CampaignTemplateModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
