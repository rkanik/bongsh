import type { TFamily } from '@/types'
import type { TZFamily } from '~~/server/api/families/index.post'

export const useFamiliesMutation = () => {
  return useMutation({
    mutationKey: ['families'],
    mutationFn: async (body: TZFamily) => {
      return await $fetch<TFamily>('/api/families', {
        body,
        method: 'POST',
      })
    },
  })
}
