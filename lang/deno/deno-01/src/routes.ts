import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";

import getDefault from "./controllers/default-get.ts";
import postDefault from "./controllers/default-post.ts";

const router = new Router();

router
  .get("/", getDefault)
  .post("/", postDefault);

export default router;
