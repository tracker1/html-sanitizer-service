import { Middleware } from "../types.ts";

const handleRequest: Middleware = ({ response }) => {
  response.status = 200;
  response.body = { msg: "Online", status: 200 };
};

export default handleRequest;
