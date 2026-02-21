import { prisma } from '~~/server/utils/db'
import type { TFamily } from '@@/shared/types'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  return (await prisma.family.findMany({
    where: {
      OR: [
        {
          ownerId: user?.id,
        },
        {
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
    },
  })) as TFamily[]
})
