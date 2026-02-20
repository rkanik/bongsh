import type { TFamily } from '@/types'

export const useFamiliesQuery = () => {
  return useQuery({
    queryKey: ['families'],
    queryFn: async () => {
      const response = await api.get<TFamily[]>('/families')
      return response.data
    },
  })
}
