import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { CampaignModel } from "../../models/campaign.model";

export class CampaignService extends Service<CampaignModel> {
  Model!: CampaignModel;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
