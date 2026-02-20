<script setup lang="ts">
import LucideSearch from '~icons/lucide/search'
import LucideSparkles from '~icons/lucide/sparkles'
import LucideHome from '~icons/lucide/home'
import LucideInbox from '~icons/lucide/inbox'
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
      title: 'Search',
      url: '#',
      icon: LucideSearch,
    },
    {
      title: 'Ask AI',
      url: '#',
      icon: LucideSparkles,
    },
    {
      title: 'Home',
      url: '#',
      icon: LucideHome,
      isActive: true,
    },
    {
      title: 'Inbox',
      url: '#',
      icon: LucideInbox,
      badge: '10',
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
      <!-- <TeamSwitcher :teams="data.teams" /> -->
      <UserDropdown />
      <NavMain :items="data.navMain" />
    </SidebarHeader>
    <SidebarContent>
      <!-- <NavFavorites :favorites="data.favorites" />
      <NavWorkspaces :workspaces="data.workspaces" /> -->
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
