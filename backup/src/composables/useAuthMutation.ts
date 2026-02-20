export const useAuthMutation = () => {
  const authStore = useAuthStore()
  return useMutation({
    mutationKey: ['useAuthMutation'],
    mutationFn: (data: any) => {
      return api.post('/auth', data)
    },
    onSuccess: (data) => {
      authStore.user = data.data.user
      authStore.token = data.data.token
    },
  })
}
