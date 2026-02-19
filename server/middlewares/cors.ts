import type { Context, Next } from "@oak/oak";
import { ALLOWED_ORIGINS } from "@/const.ts";

export default (ctx: Context, next: Next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGINS);
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  ctx.response.headers.set("Access-Control-Allow-Credentials", "true");
  ctx.response.headers.set("Access-Control-Max-Age", "86400");
  return next();
};
