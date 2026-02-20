<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      as-child
      class="inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
    >
      <button
        type="button"
        class="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="User menu"
      >
        <div
          class="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground"
        >
          <img
            v-if="user?.avatar"
            :src="user.avatar"
            :alt="user.name ?? 'Avatar'"
            class="size-full object-cover"
          />
          <span v-else class="text-xs font-medium">
            {{ initials }}
          </span>
        </div>
        <span class="max-w-32 truncate font-medium text-foreground sm:max-w-40">
          {{ user?.name ?? user?.email ?? 'User' }}
        </span>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <div class="flex items-center gap-3 p-2">
        <div
          class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground"
        >
          <img
            v-if="user?.avatar"
            :src="user.avatar"
            :alt="user.name ?? 'Avatar'"
            class="size-full object-cover"
          />
          <span v-else class="text-sm font-medium">
            {{ initials }}
          </span>
        </div>
        <div class="min-w-0 flex-1 truncate">
          <p class="truncate text-sm font-medium text-foreground">
            {{ user?.name ?? 'User' }}
          </p>
          <p v-if="user?.email" class="truncate text-xs text-muted-foreground">
            {{ user.email }}
          </p>
        </div>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" @select="authStore.logout()">
        <LucideLogOut class="size-4" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const initials = computed(() => {
  const u = user.value
  if (u?.name && typeof u.name === 'string') {
    const parts = u.name.trim().split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    return u.name.slice(0, 2).toUpperCase()
  }
  if (u?.email && typeof u.email === 'string') return u.email.slice(0, 2).toUpperCase()
  return '?'
})
</script>
