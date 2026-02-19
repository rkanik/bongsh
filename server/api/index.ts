import { Router } from '@oak/oak'
import auth from './auth/index.ts'
import users from './users/index.ts'

const router = new Router()

router
  .prefix('/api')
  .use(users.routes())
  .use(users.allowedMethods())
  .use(auth.routes())
  .use(auth.allowedMethods())
  .get('/', (ctx) => {
    ctx.response.body = 'Welcome to Bongsh API'
  })

export default router
