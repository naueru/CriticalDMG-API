export interface CampaignDTO {
  id: number;
  name: string;

  readonly players: number[];
  readonly sessions: number[];
  readonly npcs: number[];
  readonly events: number[];
  readonly owner: number;
  readonly campaign: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
