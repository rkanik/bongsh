import { Router } from "@oak/oak";
import users from "./users/index.ts";

const router = new Router();

router
  .prefix("/api")
  .use(users)
  .get("/", (ctx) => {
    ctx.response.body = "Welcome to Bongsh API";
  });

export default router.routes();
