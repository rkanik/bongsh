import type { FamilyModel } from '../../../server/generated/prisma/models/Family'

type FamilyInput = {
  name: string
  slug: string
  description?: string
}

export const useFamiliesMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['families'],
    mutationFn: async ({ id, data }: { id?: number; data: FamilyInput }) => {
      if (id) {
        const response = await api.put<FamilyModel>(`/families/${id}`, data)
        return response.data
      } else {
        const response = await api.post<FamilyModel>('/families', data)
        return response.data
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['families'] })
    },
  })
}
