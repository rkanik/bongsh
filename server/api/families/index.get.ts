import { prisma } from '~~/server/utils/db'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  return prisma.family.findMany({
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
  })
})
