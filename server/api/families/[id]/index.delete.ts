import { prisma } from '~~/server/utils/db'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const id = getRouterParam(event, 'id')
  const familyId = id && !Number.isNaN(Number(id)) ? Number(id) : null
  if (familyId == null) {
    throw createError({ statusCode: 400, message: 'Invalid family id' })
  }
  const family = await prisma.family.findFirst({
    where: { id: familyId, ownerId: user?.id ?? undefined },
  })
  if (!family) {
    throw createError({
      statusCode: 404,
      message: "Family not found or you don't have permission to delete it",
    })
  }
  await prisma.family.delete({ where: { id: familyId } })
  return { ok: true }
})
