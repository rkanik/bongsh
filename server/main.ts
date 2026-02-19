import { Application, send } from '@oak/oak'
import api from '@/api/index.ts'
import cors from '@/middlewares/cors.ts'

const app = new Application()

app.use(cors)
app.use(api.routes())
app.use(api.allowedMethods())

// Static File & SPA Fallback Middleware
app.use(async (ctx) => {
  const path = ctx.request.url.pathname
  const root = `${Deno.cwd()}/public`

  try {
    // 1. Try to serve the specific file (e.g., /app.js, /style.css)
    await send(ctx, path, {
      root,
      index: 'index.html',
    })
  } catch {
    // 2. Fallback: If file not found, serve index.html for SPA routing
    // This allows browser-side routers (React/Vue/etc.) to handle the URL
    await send(ctx, 'index.html', { root })
  }
})

app.listen({ port: 9856 })
