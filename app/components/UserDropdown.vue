<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      as-child
      class="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
    >
      <!-- class="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" -->
      <Button variant="ghost" class="justify-start px-1" aria-label="User menu">
        <div
          class="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground"
        >
          <img
            v-if="user?.avatar"
            alt="Avatar"
            class="size-full object-cover"
            :src="user?.avatar"
          />
          <span v-else class="text-xs font-medium">{{ user?.name?.slice(0, 2) }}</span>
        </div>
        <span v-if="!small" class="max-w-32 truncate font-medium text-foreground sm:max-w-40">
          {{ user?.name }}
        </span>
        <!-- <LucideChevronDown class="opacity-50" /> -->
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <div class="flex items-center gap-3 p-2">
        <div
          class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground"
        >
          <img
            v-if="user?.avatar"
            alt="Avatar"
            class="size-full object-cover"
            :src="user?.avatar"
          />
          <span v-else class="text-sm font-medium"> {{ user?.name?.slice(0, 2) }} </span>
        </div>
        <div class="min-w-0 flex-1 truncate">
          <p class="truncate text-sm font-medium text-foreground">{{ user?.name }}</p>
          <p class="truncate text-xs text-muted-foreground">{{ user?.email }}</p>
        </div>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" @select="onLogout">
        <Icon name="lucide:log-out" class="size-4" />
        Log out
      </DropdownMenuItem>
      <LogoutDialog hidden v-model:open="logoutDialog" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
defineProps<{
  small?: boolean
}>()

const { user } = useUserSession()

const logoutDialog = ref(false)
function onLogout(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  logoutDialog.value = true
}
</script>
