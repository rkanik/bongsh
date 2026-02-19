import { Router } from "@oak/oak";
import users from "./users/index.ts";

const router = new Router();

router.prefix("/api").use(users);

export default router.routes();
