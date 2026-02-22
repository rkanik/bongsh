<script setup lang="ts" generic="T">
export type ActionsMenuItem<T> = {
  id: string
  label: string
  icon: string
  variant?: 'default' | 'destructive'
  disabled?: boolean
  onClick?: (payload: T, event: Event) => void
}

const props = defineProps<{
  items: ActionsMenuItem<T>[]
  payload: T
  ariaLabel?: string
}>()

const onSelect = (item: ActionsMenuItem<T>, e: Event) => {
  if (item.disabled) return
  item.onClick?.(props.payload, e)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        class="size-8 shrink-0"
        :aria-label="ariaLabel ?? 'Actions'"
      >
        <Icon name="lucide:more-vertical" class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="item in items"
        :key="item.id"
        :variant="item.variant ?? 'default'"
        :disabled="item.disabled"
        @select="onSelect(item, $event)"
      >
        <Icon :name="item.icon" class="size-4" />
        {{ item.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
