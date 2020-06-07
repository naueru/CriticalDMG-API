import { Application } from "../declarations";
import users from "./users/users.service";
import sessions from "./sessions/sessions.service";
import sessionLogs from "./sessionLogs/sessionLogs.service";
import sessionSubscriptions from "./sessionSubscriptions/sessionSubscriptions.service";
import campaigns from "./campaigns/campaigns.service";
import characters from "./characters/characters.service";
import campaignTemplates from "./campaignTemplates/campaignTemplates.service";
import gameEngines from "./gameEngines/gameEngines.service";
import assets from "./assets/assets.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(sessions);
  app.configure(sessionLogs);
  app.configure(sessionSubscriptions);
  app.configure(campaigns);
  app.configure(characters);
app.configure(campaignTemplates);
app.configure(gameEngines);
app.configure(assets);
// Don't remove this comment. It's needed to format configure service nicely.
}
