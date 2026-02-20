import type { TFamily } from '@/types'

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
        const response = await api.put<TFamily>(`/families/${id}`, data)
        return response.data
      } else {
        const response = await api.post<TFamily>('/families', data)
        return response.data
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['families'] })
    },
  })
}
