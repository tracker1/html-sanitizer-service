import { Middleware } from "../types.ts";

const handleRequest: Middleware = ({ response }) => {
  response.status = 404;
  response.body = { msg: "Not Found" };
};

export default handleRequest;
