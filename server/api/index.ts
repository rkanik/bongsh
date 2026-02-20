import { Router } from '@oak/oak'
import auth from './auth/index.ts'
import users from './users/index.ts'
import families from './families/index.ts'

const router = new Router()

router
  .prefix('/api')
  .use(auth.routes())
  .use(auth.allowedMethods())
  .use(users.routes())
  .use(users.allowedMethods())
  .use(families.routes())
  .use(families.allowedMethods())
  .get('/', (ctx) => {
    ctx.response.body = 'Welcome to Bongsh API'
  })

export default router
