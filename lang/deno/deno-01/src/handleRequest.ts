import { Middleware } from "./deps.ts";
import { log } from "./log.ts";

import { sanitize } from "./sanitize.ts";

const ACCESS_CONTROL_ALLOW_ORIGIN =
  Deno.env.get("ACCESS_CONTROL_ALLOW_ORIGIN") || "*";

export const handleRequest: Middleware = async ({ request, response }) => {
  const start = performance.now();
  const requestId: string = request.headers.get("X-REQUEST-ID") ||
    crypto.randomUUID();

  log.debug("Request Started", {
    code: 1001,
    request: {
      id: requestId,
      method: request.method,
      url: request.url.toString(),
    },
  });

  response.headers.set(
    "Access-Control-Allow-Origin",
    ACCESS_CONTROL_ALLOW_ORIGIN,
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, HEAD",
  );

  if (request.method === "HEAD" || request.method === "OPTIONS") {
    response.status = 200;
    return;
  }

  if (request.method === "GET") {
    response.status = 200;
    response.body = { status: 200, msg: "Online", code: "ONLINE" };
    return;
  }
  if (request.method !== "POST") {
    response.status = 405;
    response.body = {
      status: 405,
      msg: "Method Not Allowed",
      code: "METHOD_NOT_ALLOWED",
    };
    return;
  }

  try {
    const input = request.hasBody && await request.body({
          contentTypes: { text: ["text/plain", "text/html", "text/*", "*"] },
        }).value || "";

    if (typeof input !== "string") {
      response.status = 400;
      response.body = {
        status: 400,
        msg: "Unknown content type.",
        code: "UNKNOWN_CONTENT_TYPE",
      };
      return;
    }

    response.status = 200;
    response.body = {
      status: 200,
      result: sanitize(input),
    };
  } catch (error) {
    response.status = 500;
    response.body = { status: 500, msg: error.msg, code: "SERVER_ERROR" };
    log.error("Request Error", {
      code: 500,
      request: { id: requestId, method: request.method, url: request.url },
      response: { status: 500, time: performance.now() - start },
      error,
    });
    return;
  }

  log.info("Request Complete", {
    code: 1002,
    request: { id: requestId, method: request.method, url: request.url },
    response: { status: response.status, time: performance.now() - start },
  });
};
