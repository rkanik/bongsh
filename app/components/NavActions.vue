<script setup lang="ts">
const data = [
  [
    {
      label: 'Customize Page',
      icon: 'lucide:settings-2',
    },
    {
      label: 'Turn into wiki',
      icon: 'lucide:file-text',
    },
  ],
  [
    {
      label: 'Copy Link',
      icon: 'lucide:link',
    },
    {
      label: 'Duplicate',
      icon: 'lucide:copy',
    },
    {
      label: 'Move to',
      icon: 'lucide:corner-up-right',
    },
    {
      label: 'Move to Trash',
      icon: 'lucide:trash-2',
    },
  ],
  [
    {
      label: 'Undo',
      icon: 'lucide:corner-up-left',
    },
    {
      label: 'View analytics',
      icon: 'lucide:line-chart',
    },
    {
      label: 'Version History',
      icon: 'lucide:gallery-vertical-end',
    },
    {
      label: 'Show delete pages',
      icon: 'lucide:trash',
    },
    {
      label: 'Notifications',
      icon: 'lucide:bell',
    },
  ],
  [
    {
      label: 'Import',
      icon: 'lucide:arrow-up',
    },
    {
      label: 'Export',
      icon: 'lucide:arrow-down',
    },
  ],
]

const isOpen = ref(false)
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <div class="hidden font-medium text-muted-foreground md:inline-block">Edit Oct 08</div>
    <Button variant="ghost" size="icon" class="h-7 w-7">
      <Icon name="lucide:star" />
    </Button>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button variant="ghost" size="icon" class="h-7 w-7 data-[state=open]:bg-accent">
          <Icon name="lucide:more-horizontal" />
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
                      <Icon :name="item.icon" /> <span>{{ item.label }}</span>
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
