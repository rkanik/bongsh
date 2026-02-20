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
        <LucideMonitor v-if="theme === 'system'" class="size-4" />
        <LucideSun v-else-if="theme === 'light'" class="size-4" />
        <LucideMoon v-else class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-40">
      <DropdownMenuRadioGroup
        :model-value="theme"
        @update:model-value="(v) => v && setTheme(v as Theme)"
      >
        <DropdownMenuRadioItem value="light">
          <LucideSun class="size-4" />
          Light
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">
          <LucideMoon class="size-4" />
          Dark
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="system">
          <LucideMonitor class="size-4" />
          System
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
const { theme, setTheme } = useTheme()
</script>
