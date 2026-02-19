import { Application } from "@oak/oak";
import api from "@/api/index.ts";
import cors from "@/middlewares/cors.ts";

const app = new Application();

app.use(cors);
app.use(async (ctx, next) => {
  await next();
  console.log("cors middleware called for", ctx.request.url);
});
app.use(api);

// Serve static files from the public directory
// This middleware should come after API routes so API requests aren't intercepted
app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html", // Serve index.html for directory requests
    });
  } catch {
    // If file not found, continue to next middleware
    await next();
  }
});

app.listen({ port: 9856 });
