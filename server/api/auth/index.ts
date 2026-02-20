import { Router } from '@oak/oak'
import { db } from '@/utils/db.ts'
import { z } from '@zod/zod'
import { hash, verify } from '@felix/bcrypt'
import { SignJWT } from '@panva/jose'
import { JWT_SECRET } from '@/const.ts'
import { validate } from '@/middlewares/validate.ts'

const router = new Router()

async function createJWT(payload: any): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('168h')
    .sign(JWT_SECRET)
  return jwt
}

type TZAuth = z.infer<typeof zAuth>
const zAuth = z
  .union([
    z.object({
      tab: z.literal('check'),
      email: z.email(),
    }),
    z.object({
      tab: z.literal('login'),
      email: z.email(),
      password: z.string().min(8),
    }),
    z.object({
      tab: z.literal('register'),
      email: z.email(),
      name: z.string().min(3, 'Please enter a valid name'),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    }),
  ])
  .superRefine((data, ctx) => {
    if (data.tab === 'register') {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmPassword'],
          message: 'Passwords do not match',
        })
      }
    }
  })

router.prefix('/auth').post('/', validate(zAuth), async (ctx) => {
  try {
    const body: TZAuth = ctx.state.body

    // Check
    if (body.tab === 'check') {
      const user = await db.user.findFirst({
        where: {
          email: body.email,
        },
      })
      if (user) {
        ctx.response.status = 200
        ctx.response.body = {
          tab: 'login',
        }
        return
      }
      ctx.response.status = 200
      ctx.response.body = {
        tab: 'register',
      }
      return
    }

    // Login
    if (body.tab === 'login') {
      const user = await db.user.findFirst({
        where: {
          email: body.email,
        },
      })
      if (!user) {
        ctx.response.status = 422
        ctx.response.body = {
          issues: [
            {
              code: 'custom',
              path: ['email'],
              message: 'Wrong email address, try again!',
            },
          ],
        }
        return
      }
      if (!user.password) {
        ctx.response.status = 422
        ctx.response.body = {
          message: 'Please login with social account',
        }
        return
      }

      const isPasswordValid = await verify(body.password, user.password)
      if (!isPasswordValid) {
        ctx.response.status = 422
        ctx.response.body = {
          issues: [
            {
              code: 'custom',
              path: ['password'],
              message: 'Wrong password, try again!',
            },
          ],
        }
        return
      }
      const token = await createJWT({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      })
      ctx.response.status = 200
      ctx.response.body = { token, user }
      return
    }

    // Register
    if (body.tab === 'register') {
      const existingUser = await db.user.findFirst({
        where: {
          email: body.email,
        },
      })
      if (existingUser) {
        ctx.response.status = 422
        ctx.response.body = {
          issues: [
            {
              code: 'custom',
              path: ['email'],
              message: 'Email address is already taken!',
            },
          ],
        }
        return
      }
      const user = await db.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await hash(body.password),
        },
      })
      const token = await createJWT({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      })
      ctx.response.status = 200
      ctx.response.body = { token, user }
      return
    }

    ctx.response.status = 400
    ctx.response.body = {
      message: 'Invalid tab',
    }
    return
  } catch (error) {
    ctx.response.status = 500
    ctx.response.body = {
      message: error instanceof Error ? error.message : 'Internal server error',
    }
    return
  }
})

export default router
