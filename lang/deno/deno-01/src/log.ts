import * as log from "https://deno.land/std@0.119.0/log/mod.ts";
import { clone, skipValue, yaml } from "./deps.ts";

const LOG_LEVEL = (function () {
  switch ((Deno.env.get("LOG_LEVEL") || "INFO").trim().toUpperCase()) {
    case "DEBUG":
      return "DEBUG";
    case "WARNING":
      return "WARNING";
    case "ERROR":
      return "ERROR";
    case "CRITICAL":
      return "CRITICAL";
    case "INFO":
    case "NOTSET":
    default:
      return "INFO";
  }
}());
Deno.env.get("LOG_LEVEL") || "INFO";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG", {
      formatter: (rec) => {
        const { level, dtm, msg, info, detail } = clone({
          level: rec.levelName,
          dtm: rec.datetime,
          msg: rec.msg,
          info: { ...Object(rec?.args?.[0]) },
          detail: ~~rec?.args?.length < 2 ? undefined : rec.args.slice(1),
        }, skipValue);

        if (!Deno.isatty(Deno.stdout.rid)) {
          return JSON.stringify({
            level,
            dtm,
            msg,
            ...info,
            detail: detail || undefined,
          });
        }

        return yaml.stringify({
          [level]: {
            dtm,
            level,
            msg,
            info,
            detail,
          },
        }, { indent: 4, skipInvalid: true });
      },
    }),
  },

  //assign handlers to loggers
  loggers: {
    default: {
      level: LOG_LEVEL,
      handlers: ["console"],
    },
  },
});

export { log };
