<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <RouterLink
          to="/"
          class="font-semibold text-foreground hover:text-primary transition-colors"
        >
          Bongsh
        </RouterLink>
        <nav class="flex items-center gap-2">
          <RouterLink
            v-if="!authStore.user"
            to="/auth"
            class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Sign in
          </RouterLink>
          <RouterLink
            v-else
            to="/app"
            class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            My tree
          </RouterLink>
          <UserDropdown v-if="authStore.user" />
          <ThemeToggler />
        </nav>
      </div>
    </header>
    <main class="flex-1">
      <RouterView />
    </main>
    <footer class="border-t border-border bg-muted/30 py-6">
      <div class="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        Bongsh — map your roots, together.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ThemeToggler from '@/components/ThemeToggler.vue'
import UserDropdown from '@/components/UserDropdown.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
</script>
