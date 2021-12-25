import { Middleware } from "../types.ts";

const handleRequest: Middleware = async ({ response }, nextFn) => {
  try {
    await nextFn();
  } catch (err) {
    response.status = 500;
    response.body = { msg: err.message };
  }
};

export default handleRequest;
