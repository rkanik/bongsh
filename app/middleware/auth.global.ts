export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.layout) {
    const { loggedIn } = useUserSession()
    if (to.meta.layout === 'auth-layout' && loggedIn.value) {
      return navigateTo('/app')
    }
    if (to.meta.layout === 'app-layout' && !loggedIn.value) {
      return navigateTo('/auth')
    }
  }
})
