export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref()
    const token = ref<string>()

    const login = async (email: string, password: string) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        })
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error(error)
      } finally {
        user.value = { id: 1 }
        token.value = 'data.token'
      }
      router.replace('/app')
    }

    const logout = async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        method: 'POST',
      })
      user.value = undefined
      token.value = undefined
    }

    return {
      user,
      token,
      login,
      logout,
    }
  },
  {
    persist: {
      pick: ['user', 'token'],
    },
  },
)
