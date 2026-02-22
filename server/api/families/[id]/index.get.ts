import { prisma } from '~~/server/utils/db'
import type { TFamily } from '@@/shared/types'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const slug = getRouterParam(event, 'id')
  const id = slug ? (!isNaN(+slug) ? +slug : undefined) : undefined
  const family = (await prisma.family.findFirst({
    where: {
      OR: [
        {
          id,
          slug,
          ownerId: user?.id,
        },
        {
          id,
          slug,
          members: {
            some: {
              userId: user?.id,
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
      persons: {
        select: {
          id: true,
          name: true,
          parents: {
            include: {},
          },
        },
      },
    },
  })) as TFamily | null
  if (!family) {
    return createError({
      statusCode: 404,
      data: {
        message: "Family not found or you don't have permission to access it",
      },
    })
  }
  return family
})
