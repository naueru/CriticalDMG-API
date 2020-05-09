import { Application } from "../declarations";
import users from "./users/users.service";
import rooms from "./rooms/rooms.service";
import roomLogs from "./roomLogs/roomsLogs.service";
import roomSubscriptions from "./roomSubscriptions/roomSubscriptions.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(rooms);
  app.configure(roomLogs);
  app.configure(roomSubscriptions);
}
