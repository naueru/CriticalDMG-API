import logger from "./logger";
import app from "./app";
import { SettingName } from "./declarations";

const port = app.get(SettingName.PORT);
const server = app.listen(port);

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () =>
  logger.info(
    "Feathers application started on http://%s:%d",
    app.get(SettingName.HOST),
    port
  )
);
