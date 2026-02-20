<script setup lang="ts">
import LucideArrowDown from '~icons/lucide/arrow-down'
import LucideArrowUp from '~icons/lucide/arrow-up'
import LucideBell from '~icons/lucide/bell'
import LucideCopy from '~icons/lucide/copy'
import LucideCornerUpLeft from '~icons/lucide/corner-up-left'
import LucideCornerUpRight from '~icons/lucide/corner-up-right'
import LucideFileText from '~icons/lucide/file-text'
import LucideGalleryVerticalEnd from '~icons/lucide/gallery-vertical-end'
import LucideLineChart from '~icons/lucide/line-chart'
import LucideLink from '~icons/lucide/link'
import LucideMoreHorizontal from '~icons/lucide/more-horizontal'
import LucideSettings2 from '~icons/lucide/settings-2'
import LucideStar from '~icons/lucide/star'
import LucideTrash from '~icons/lucide/trash'
import LucideTrash2 from '~icons/lucide/trash-2'

const data = [
  [
    {
      label: 'Customize Page',
      icon: LucideSettings2,
    },
    {
      label: 'Turn into wiki',
      icon: LucideFileText,
    },
  ],
  [
    {
      label: 'Copy Link',
      icon: LucideLink,
    },
    {
      label: 'Duplicate',
      icon: LucideCopy,
    },
    {
      label: 'Move to',
      icon: LucideCornerUpRight,
    },
    {
      label: 'Move to Trash',
      icon: LucideTrash2,
    },
  ],
  [
    {
      label: 'Undo',
      icon: LucideCornerUpLeft,
    },
    {
      label: 'View analytics',
      icon: LucideLineChart,
    },
    {
      label: 'Version History',
      icon: LucideGalleryVerticalEnd,
    },
    {
      label: 'Show delete pages',
      icon: LucideTrash,
    },
    {
      label: 'Notifications',
      icon: LucideBell,
    },
  ],
  [
    {
      label: 'Import',
      icon: LucideArrowUp,
    },
    {
      label: 'Export',
      icon: LucideArrowDown,
    },
  ],
]

const isOpen = ref(false)
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <div class="hidden font-medium text-muted-foreground md:inline-block">Edit Oct 08</div>
    <Button variant="ghost" size="icon" class="h-7 w-7">
      <LucideStar />
    </Button>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button variant="ghost" size="icon" class="h-7 w-7 data-[state=open]:bg-accent">
          <LucideMoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-56 overflow-hidden rounded-lg p-0" align="end">
        <Sidebar collapsible="none" class="bg-transparent">
          <SidebarContent>
            <SidebarGroup
              v-for="(group, index) in data"
              :key="index"
              class="border-b last:border-none"
            >
              <SidebarGroupContent class="gap-0">
                <SidebarMenu>
                  <SidebarMenuItem v-for="(item, index) in group" :key="index">
                    <SidebarMenuButton>
                      <component :is="item.icon" /> <span>{{ item.label }}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </PopoverContent>
    </Popover>
  </div>
</template>
