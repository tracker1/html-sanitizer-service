import { Application } from "./deps.ts";
import { log } from "./log.ts";
import { handleRequest } from "./handleRequest.ts";

const APP_HOST = Deno.env.get("APP_HOST") || "0.0.0.0";
const APP_PORT = Deno.env.get("APP_PORT") || 80;

const app = new Application();

app.use(handleRequest);

log.info(`Listening`, {
  code: 1000,
  interface: `http://${APP_HOST}:${APP_PORT}/`,
  host: APP_HOST,
  port: APP_PORT,
});

await app.listen(`${APP_HOST}:${APP_PORT}`);
