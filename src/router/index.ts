import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/default/index.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/pages/index.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('@/pages/auth/index.vue'),
      meta: {
        requiresUnauth: true,
      },
    },
    {
      path: '/app',
      component: () => import('@/layouts/app/index.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          component: () => import('@/pages/app/index.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.user) {
    return next('/auth')
  }
  if (to.meta.requiresUnauth && authStore.user) {
    return next('/app')
  }
  return next()
})

export { router }
