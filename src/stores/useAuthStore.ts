import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref()
    const token = ref<string>()

    const login = async (email: string, password: string) => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      user.value = {
        id: 1,
      }
      router.push('/app')
    }

    const logout = async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        method: 'POST',
      })
      user.value = undefined
      token.value = undefined
      router.push('/auth')
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
