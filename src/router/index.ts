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
    },
    {
      path: '/app',
      component: () => import('@/layouts/app/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/app/index.vue'),
        },
      ],
    },
  ],
})

export default router
