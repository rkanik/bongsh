import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    Components({
      dts: true,
      directoryAsNamespace: false,
    }),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'lucide-vue-next': ['Sun', 'Moon', 'Monitor'],
        },
      ],
      dtsMode: 'overwrite',
      viteOptimizeDeps: true,
      dirs: ['./src/composables/**', './src/stores/**'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
