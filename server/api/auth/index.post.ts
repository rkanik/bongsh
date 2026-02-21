import { z } from 'zod'

type TZAuth = z.infer<typeof zAuth>
const zAuth = z
  .union([
    z.object({
      tab: z.literal('check'),
      email: z.string().email(),
    }),
    z.object({
      tab: z.literal('login'),
      email: z.string().email(),
      password: z.string().min(8),
    }),
    z.object({
      tab: z.literal('register'),
      email: z.string().email(),
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

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const data = zAuth.safeParse(body)
    if (!data.success) {
      return createError({
        statusCode: 422,
        data: {
          issues: data.error.issues,
        },
      })
    }

    // Check
    if (body.tab === 'check') {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      })
      return {
        tab: user ? 'login' : 'register',
      }
    }

    // Login
    if (body.tab === 'login') {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      })
      if (!user) {
        return createError({
          statusCode: 422,
          data: {
            issues: [
              {
                code: 'custom',
                path: ['email'],
                message: 'Wrong email address, try again!',
              },
            ],
          },
        })
      }
      if (!user.password) {
        return createError({
          statusCode: 422,
          data: {
            message: 'Please login with social account',
          },
        })
      }

      const needsRehash = passwordNeedsReHash(user.password)
      if (needsRehash) {
        user.password = await hashPassword(body.password)
        await prisma.user.update({
          where: { id: user.id },
          data: { password: user.password },
        })
      }

      const isPasswordValid = await verifyPassword(user.password, body.password)
      if (!isPasswordValid) {
        return createError({
          statusCode: 422,
          data: {
            message: 'Wrong password, try again!',
          },
        })
      }
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }
      setUserSession(event, {
        user: data,
        loggedInAt: new Date(),
      })
      return {
        user: data,
      }
    }

    // Register
    if (body.tab === 'register') {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      })
      if (existingUser) {
        return createError({
          statusCode: 422,
          data: {
            issues: [
              {
                code: 'custom',
                path: ['email'],
                message: 'Email address is already taken!',
              },
            ],
          },
        })
      }
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await hashPassword(body.password),
        },
      })
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
      }
      setUserSession(event, {
        user: data,
        loggedInAt: new Date(),
      })
      return {
        user: data,
      }
    }
    return createError({
      statusCode: 400,
      data: {
        message: 'Invalid tab',
      },
    })
  } catch (error) {
    return createError({
      statusCode: 500,
      data: {
        message: error instanceof Error ? error.message : 'Internal server error',
      },
    })
  }
})
