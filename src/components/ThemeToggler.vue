<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      as-child
      class="inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
    >
      <button
        type="button"
        class="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Theme"
      >
        <component :is="themeIcon" class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-40">
      <DropdownMenuRadioGroup
        :model-value="theme"
        @update:model-value="(v) => v && setTheme(v as Theme)"
      >
        <DropdownMenuRadioItem value="light">
          <Sun class="size-4" />
          Light
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">
          <Moon class="size-4" />
          Dark
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="system">
          <Monitor class="size-4" />
          System
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Theme } from '@/composables/useTheme'
import { useTheme } from '@/composables/useTheme'
import { computed } from 'vue'
import { Monitor, Moon, Sun } from 'lucide-vue-next'

const { theme, setTheme } = useTheme()

const themeIcon = computed(() => {
  switch (theme.value) {
    case 'light':
      return Sun
    case 'dark':
      return Moon
    default:
      return Monitor
  }
})
</script>
