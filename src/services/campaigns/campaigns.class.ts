import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { CampaignModel } from "../../models/campaigns.model";

export class CampaignService extends Service<CampaignModel> {
  Model!: CampaignModel;

  constructor(options: Partial<SequelizeServiceOptions>) {
    super(options);
  }
}
