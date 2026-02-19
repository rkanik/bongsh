<template>
  <button
    @click="toggleDark()"
    class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
  >
    {{ isDark ? '🌞 Light Mode' : '🌙 Dark Mode' }}
  </button>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
