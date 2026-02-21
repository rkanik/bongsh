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
        const response = await $fetch<TFamily>(`/families/${id}`, {
          method: 'PUT',
          body: data,
        })
        return response.data
      } else {
        const response = await $fetch<TFamily>('/families', {
          method: 'POST',
          body: data,
        })
        return response.data
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['families'],
      })
    },
  })
}
