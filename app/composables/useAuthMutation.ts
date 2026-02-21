export const useAuthMutation = () => {
  return useMutation({
    mutationKey: ['useAuthMutation'],
    mutationFn: (body: any) => {
      return $fetch('/api/auth', {
        body,
        method: 'POST',
      })
    },
  })
}
