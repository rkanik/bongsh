import { Router } from '@oak/oak'
import { db } from '@/utils/db.ts'

const router = new Router()

router.prefix('/auth').post('/login', async (ctx) => {
  const body = await ctx.request.body.json()
  if (!body.email || !body.password) {
    ctx.response.status = 400
    ctx.response.body = { error: 'Email and password are required' }
    return
  }
  const user = await db.user.findFirst({
    where: {
      email: body.email,
    },
  })
  if (!user) {
    ctx.response.status = 401
    ctx.response.body = { error: 'Invalid email or password' }
    return
  }
  if (user.password !== body.password) {
    ctx.response.status = 401
    ctx.response.body = { error: 'Invalid email or password' }
    return
  }
  ctx.response.body = {
    user,
    token: '1234567890',
  }
})

export default router
