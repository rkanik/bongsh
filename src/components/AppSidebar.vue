<script setup lang="ts">
import LucideFolderTree from '~icons/lucide/folder-tree'
import LucideCalendar from '~icons/lucide/calendar'
import LucideSettings2 from '~icons/lucide/settings-2'
import LucideBlocks from '~icons/lucide/blocks'
import LucideTrash2 from '~icons/lucide/trash-2'
import LucideMessageCircleQuestion from '~icons/lucide/message-circle-question'
import type { SidebarProps } from './ui/sidebar'

const props = defineProps<SidebarProps>()

// This is sample data.
const data = {
  navMain: [
    {
      title: 'My Family',
      to: '/app',
      icon: LucideFolderTree,
      isActive: true,
    },
    {
      title: 'Settings',
      to: '/app/settings',
      icon: LucideSettings2,
    },
  ],
  navSecondary: [
    {
      title: 'Calendar',
      url: '#',
      icon: LucideCalendar,
    },
    {
      title: 'Settings',
      url: '#',
      icon: LucideSettings2,
    },
    {
      title: 'Templates',
      url: '#',
      icon: LucideBlocks,
    },
    {
      title: 'Trash',
      url: '#',
      icon: LucideTrash2,
    },
    {
      title: 'Help',
      url: '#',
      icon: LucideMessageCircleQuestion,
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
