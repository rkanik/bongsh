import { Router } from "@oak/oak";
import { db } from "@/utils/db.ts";

const router = new Router();

router
  .prefix("/users")
  .get("/", async (ctx) => {
    const users = await db.user.findMany();
    ctx.response.body = users;
  })
  .post("/", async (ctx) => {
    const user = await db.user.create({
      data: {
        name: ctx.request.body.name,
      },
    });
    ctx.response.body = user;
  });

export default router;
