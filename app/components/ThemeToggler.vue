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
        <Icon name="lucide:monitor" v-if="$colorMode.preference === 'system'" />
        <Icon name="lucide:sun" v-else-if="$colorMode.preference === 'light'" />
        <Icon name="lucide:moon" v-else />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-40">
      <DropdownMenuRadioGroup
        :model-value="$colorMode.preference"
        @update:model-value="v => v && onThemeChange(v as string)"
      >
        <DropdownMenuRadioItem value="light">
          <Icon name="lucide:sun" />
          Light
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">
          <Icon name="lucide:moon" />
          Dark
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="system">
          <Icon name="lucide:monitor" />
          System
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const onThemeChange = (value: string) => {
  colorMode.preference = value
}
</script>
