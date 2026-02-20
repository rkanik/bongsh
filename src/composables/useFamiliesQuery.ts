import type { FamilyModel } from '@server/generated/prisma/models/Family.ts'

export const useFamiliesQuery = () => {
  return useQuery({
    queryKey: ['families'],
    queryFn: async () => {
      const response = await api.get<FamilyModel[]>('/families')
      return response.data
    },
  })
}
