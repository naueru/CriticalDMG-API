import { Application } from "../declarations";
import users from "./users/users.service";
import sessions from "./sessions/sessions.service";
import sessionLogs from "./sessionLogs/sessionLogs.service";
import sessionSubscriptions from "./sessionSubscriptions/sessionSubscriptions.service";
import campaigns from "./campaign/campaigns.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(sessions);
  app.configure(sessionLogs);
  app.configure(sessionSubscriptions);
  app.configure(campaigns);
}
