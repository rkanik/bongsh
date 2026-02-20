import { z } from '@zod/zod'
import { db } from '@/utils/db.ts'
import { auth } from '@/middlewares/auth.ts'
import { Router } from '@oak/oak'
import { validate } from '@/middlewares/validate.ts'
import { slugify } from '@/utils/slugify.ts'

const router = new Router()

type TZFamily = z.infer<typeof zFamily>
const zFamily = z.object({
  name: z.string().min(3, 'Please enter a valid name'),
  slug: z
    .string()
    .min(3, 'Please enter a valid slug')
    .regex(/^[a-z0-9-]+$/, 'Please enter a valid slug'),
  description: z.string().optional(),
})

router
  .prefix('/families')
  .use(auth)
  .get('/', async (ctx) => {
    const users = await db.family.findMany({
      where: {
        OR: [
          {
            ownerId: ctx.state.user.id,
          },
          {
            members: {
              some: {
                userId: ctx.state.user.id,
              },
            },
          },
        ],
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
      },
    })
    ctx.response.body = users
  })
  .post('/', validate(zFamily), async (ctx) => {
    try {
      const body: TZFamily = ctx.state.body
      const family = await db.family.create({
        data: {
          ownerId: ctx.state.user.id,
          name: body.name,
          slug: slugify(body.name),
          description: body.description,
        },
      })
      ctx.response.body = family
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error'
      if (message.includes('Unique constraint failed')) {
        ctx.response.status = 422
        ctx.response.body = {
          issues: [
            {
              path: ['slug'],
              message: 'Slug already exists',
            },
          ],
        }
        return
      }
      ctx.response.status = 422
      ctx.response.body = { message }
    }
  })
  .put('/:id', validate(zFamily), async (ctx) => {
    try {
      const id = parseInt(ctx.params.id)
      const body: TZFamily = ctx.state.body

      // Verify the family belongs to the user
      const existingFamily = await db.family.findFirst({
        where: {
          id,
          ownerId: ctx.state.user.id,
        },
      })

      if (!existingFamily) {
        ctx.response.status = 404
        ctx.response.body = {
          message: "You don't have permission to update this family",
        }
        return
      }

      const family = await db.family.update({
        where: { id },
        data: {
          name: body.name,
          slug: slugify(body.name),
          description: body.description,
        },
      })
      ctx.response.body = family
    } catch (error) {
      ctx.response.status = 422
      ctx.response.body = {
        message: error instanceof Error ? error.message : 'Internal server error',
      }
    }
  })

export default router
