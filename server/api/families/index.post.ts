import { z } from 'zod'

export type TZFamily = z.infer<typeof zFamily>
const zFamily = z.object({
  id: z.number().nullish(),
  name: z.string().min(3, 'Please enter a valid name'),
  slug: z
    .string()
    .min(3, 'Please enter a valid slug')
    .regex(/^[a-z0-9-]+$/, 'Please enter a valid slug'),
  description: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  try {
    const { user } = await getUserSession(event)
    if (!user?.id) {
      return createError({
        statusCode: 401,
        data: {
          message: 'Unauthorized',
        },
      })
    }
    const body = await readBody(event)
    const data = zFamily.safeParse(body)

    if (!data.success) {
      return createError({
        statusCode: 422,
        data: {
          issues: data.error.issues,
        },
      })
    }
    if (data.data.id) {
      const existingFamily = await prisma.family.findFirst({
        where: {
          id: data.data.id,
          ownerId: user?.id,
        },
      })
      if (!existingFamily) {
        return createError({
          statusCode: 404,
          data: {
            message: "You don't have permission to update this family",
          },
        })
      }
      return await prisma.family.update({
        where: { id: data.data.id },
        data: {
          name: body.name,
          description: body.description,
        },
      })
    }
    return await prisma.family.create({
      data: {
        ownerId: user.id,
        name: body.name,
        slug: slugify(body.slug),
        description: body.description,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    if (message.includes('Unique constraint failed')) {
      return createError({
        statusCode: 422,
        data: {
          issues: [
            {
              path: ['slug'],
              message: 'Slug already exists',
            },
          ],
        },
      })
    }
    return createError({
      statusCode: 422,
      data: {
        message: message,
      },
    })
  }
})
