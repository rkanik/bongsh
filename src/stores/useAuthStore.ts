export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref()
    const token = ref<string>()
    return {
      user,
      token,
    }
  },
  {
    persist: {
      pick: ['user', 'token'],
    },
  },
)
