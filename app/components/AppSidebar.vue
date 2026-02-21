<script setup lang="ts">
import type { SidebarProps } from './ui/sidebar'

const props = defineProps<SidebarProps>()

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Home',
      to: '/app',
      icon: 'lucide:house',
    },
    {
      title: 'Families',
      to: '/app/families',
      icon: 'lucide:users',
    },
    {
      title: 'Shared',
      to: '/app/shared',
      icon: 'lucide:folder-tree',
    },
    {
      title: 'Settings',
      to: '/app/settings',
      icon: 'lucide:settings-2',
    },
  ],
  navSecondary: [
    {
      title: 'Calendar',
      url: '#',
      icon: 'lucide:calendar',
    },
    {
      title: 'Settings',
      url: '#',
      icon: 'lucide:settings-2',
    },
    {
      title: 'Templates',
      url: '#',
      icon: 'lucide:blocks',
    },
    {
      title: 'Trash',
      url: '#',
      icon: 'lucide:trash-2',
    },
    {
      title: 'Help',
      url: '#',
      icon: 'lucide:message-circle-question',
    },
  ],
}
</script>

<template>
  <Sidebar class="border-r-0" v-bind="props">
    <SidebarHeader>
      <UserDropdown />
      <SidebarMenu>
        <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
          <SidebarMenuButton as-child :is-active="item.to === $route.path">
            <RouterLink :to="item.to">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
