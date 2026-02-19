<template>
  <div>
    <header>
      <h1>Header</h1>
      <ThemeToggler />
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <h1>Footer</h1>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ThemeToggler from '@/components/ThemeToggler.vue'
</script>
