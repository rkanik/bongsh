import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      dts: true,
      dtsMode: 'overwrite',
      viteOptimizeDeps: true,
      dirs: [
        './src/lib/**',
        './src/utils/**',
        './src/const.ts',
        './src/stores/**',
        './src/router/**',
        './src/composables/**',
      ],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/],
      imports: [
        'vue',
        'pinia',
        'vue-router',
        '@vueuse/core',
        {
          zod: ['z'],
          'vue-sonner': ['toast'],
          '@tanstack/vue-form': ['useForm'],
          '@tanstack/vue-query': ['useQuery', 'useMutation'],
        },
      ],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    Components({
      dts: true,
      syncMode: 'overwrite',
      directoryAsNamespace: false,
      resolvers: [
        IconsResolver({
          prefix: '',
        }),
      ],
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
