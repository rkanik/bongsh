import { Application } from "@oak/oak";
import api from "./api/index.ts";

const app = new Application();

app.use(api);

app.listen({ port: 5173 });
