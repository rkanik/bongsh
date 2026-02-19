import { Application } from "@oak/oak";
import api from "./api/index.ts";

const app = new Application();

app.use(api);

app.use((ctx) => {
  ctx.response.body = "Welcome to Bongsh";
});

app.listen({ port: 5173 });
