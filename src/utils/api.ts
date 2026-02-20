import axios from 'axios'

const api = axios.create({
  baseURL: `${SERVER_URL}/api`,
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

export { api }
