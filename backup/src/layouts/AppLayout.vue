<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2">
        <div class="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage class="line-clamp-1">My Family</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div class="ml-auto px-3">
          <NavActions />
        </div>
      </header>
      <div class="flex flex-1 flex-col">
        <router-view v-slot="{ Component, route }">
          <transition name="route-transition" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
.route-transition-enter,
.route-transition-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
.route-transition-enter-active,
.route-transition-leave-active {
  transition: all 250ms ease;
}
.route-transition-enter-to,
.route-transition-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
