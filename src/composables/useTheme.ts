import { computed, watch } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'bongsh-theme'

export function useTheme() {
  const preferredDark = usePreferredDark()
  const theme = useStorage<Theme>(STORAGE_KEY, 'system')

  const isDark = computed(() => {
    if (theme.value === 'system') return preferredDark.value
    return theme.value === 'dark'
  })

  function setTheme(value: Theme) {
    theme.value = value
  }

  watch(
    isDark,
    (dark) => {
      const root = document.documentElement
      if (dark) root.classList.add('dark')
      else root.classList.remove('dark')
    },
    { immediate: true },
  )

  return { theme, isDark, setTheme }
}
