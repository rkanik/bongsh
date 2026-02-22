import { prisma } from '~~/server/utils/db'
import type { TPerson } from '@@/shared/types'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  if (!user?.id) {
    return createError({
      statusCode: 401,
      data: { message: 'Unauthorized' },
    })
  }
  const slug = getRouterParam(event, 'id')
  const idParam = slug ? (!isNaN(+slug) ? +slug : undefined) : undefined
  const family = await prisma.family.findFirst({
    where: {
      OR: [
        { id: idParam, ownerId: user.id },
        {
          id: idParam,
          members: { some: { userId: user.id } },
        },
      ],
    },
    include: { persons: { select: { id: true } } },
  })
  if (!family) {
    return createError({
      statusCode: 404,
      data: { message: "Family not found or you don't have permission to access it" },
    })
  }
  const body = await readBody(event)
  const raw = {
    name: body.name,
    email: body.email ?? '',
    phone: body.phone,
    dob: body.dob,
    gender: body.gender,
    isLiving: body.isLiving ?? true,
    linkAs: body.linkAs ?? 'none',
    relatedPersonId: body.relatedPersonId,
    parentType: body.parentType,
  }
  const { z } = await import('zod')
  const data = z
    .object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email().optional().or(z.literal('')),
      phone: z.string().optional(),
      dob: z.string().optional(),
      gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
      isLiving: z.boolean().optional(),
      linkAs: z.enum(['none', 'child', 'parent']).optional(),
      relatedPersonId: z.number().optional(),
      parentType: z.enum(['FATHER', 'MOTHER', 'ADOPTIVE']).optional(),
    })
    .safeParse(raw)

  if (!data.success) {
    return createError({
      statusCode: 422,
      data: { issues: data.error.issues },
    })
  }

  const { linkAs, relatedPersonId, parentType, ...personData } = data.data
  const familyPersonIds = new Set(family.persons.map((p) => p.id))
  let parentId: number | null = null
  let childId: number | null = null
  const type = (data.data.parentType ?? 'FATHER') as 'FATHER' | 'MOTHER' | 'ADOPTIVE'

  if (linkAs === 'child' && relatedPersonId && familyPersonIds.has(relatedPersonId)) {
    parentId = relatedPersonId
  } else if (linkAs === 'parent' && relatedPersonId && familyPersonIds.has(relatedPersonId)) {
    childId = relatedPersonId
  }

  const dobDate = personData.dob ? new Date(personData.dob) : null
  const person = await prisma.person.create({
    data: {
      familyId: family.id,
      name: personData.name,
      email: personData.email || null,
      phone: personData.phone ?? null,
      dob: dobDate,
      gender: personData.gender ?? null,
      isLiving: personData.isLiving ?? true,
    },
  })

  if (parentId !== null) {
    await prisma.parentChild.create({
      data: { parentId, childId: person.id, type },
    })
  } else if (childId !== null) {
    await prisma.parentChild.create({
      data: { parentId: person.id, childId, type },
    })
  }

  return person as TPerson
})
