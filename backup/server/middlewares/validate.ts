import { z } from '@zod/zod'
import { Context, Next } from '@oak/oak'

export const validate = (schema: z.ZodSchema) => {
  return async (ctx: Context, next: Next) => {
    const body = await ctx.request.body.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      ctx.response.status = 422
      ctx.response.body = {
        issues: result.error.issues,
      }
      return
    }
    ctx.state.body = result.data
    await next()
  }
}
