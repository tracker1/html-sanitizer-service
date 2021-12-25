import { Middleware } from "../types.ts";

// const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const handleRequest: Middleware = async ({ request, response }) => {
  // console.log("headers", request.headers);

  if (!request.hasBody) {
    response.status = 400;
    response.body = { status: 400, msg: "Missing post data" };
    return;
  }

  const text = await request.body({
    contentTypes: { text: ["text/plain", "text/html", "text/*", "*"] },
  }).value;

  response.status = 200;
  response.body = {
    status: 200,
    text,
  };
};

export default handleRequest;
