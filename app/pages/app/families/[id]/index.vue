<script setup lang="ts">
definePageMeta({
  layout: 'app-layout',
  pageTransition: {
    name: 'slide-transition',
    mode: 'out-in',
  },
})

const route = useRoute()
const { data: family, status, error, refresh } = useFetch(`/api/families/${route.params.id}`)
const personFormOpen = ref(false)
</script>

<template>
  <div class="p-4">
    <div class="flex justify-center">
      <Spinner v-if="status === 'pending'" class="size-10" />
    </div>
    <div v-if="error" class="flex flex-col items-center gap-2">
      <Icon name="lucide:alert-circle" class="text-4xl" />
      <p class="text-center text-lg font-medium">
        {{ error?.data?.data?.message || 'An unknown error occurred' }}
      </p>
    </div>

    <div v-if="family" class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-2xl font-semibold">{{ family.name }}</h1>
        <Button @click="personFormOpen = true">
          <Icon name="lucide:user-plus" class="mr-2 size-4" />
          Add person
        </Button>
      </div>
      <FamilyTree :family="family" />
      <PersonForm
        v-model:open="personFormOpen"
        :family="family"
        @success="refresh()"
      />
    </div>
  </div>
</template>
