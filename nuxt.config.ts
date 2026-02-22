// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/icon',
    '@peterbud/nuxt-query',
    '@nuxtjs/color-mode',
    'nuxt-primevue',
  ],
  css: ['primevue/resources/themes/aura-light-green/theme.css'],
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
  nuxtQuery: {
    devtools: true,
    autoImports: true,
  },
  colorMode: {
    storage: 'cookie',
  },
})
