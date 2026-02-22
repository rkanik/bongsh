<script setup lang="ts">
definePageMeta({
  layout: 'app-layout',
  pageTransition: {
    name: 'slide-transition',
    mode: 'out-in',
  },
})

const route = useRoute()
const { data: family, status, error } = useFetch(`/api/families/${route.params.id}`)
</script>

<template>
  <div class="p-4">
    <div class="flex justify-center">
      <Spinner v-if="status === 'pending'" class="size-10" />
    </div>
    <div v-if="error" class="flex flex-col items-center gap-2">
      <Icon name="lucide:alert-circle" class="text-4xl" />
      <p class="text-center text-lg font-medium">
        {{ error?.data.data.message || 'An unknown error occurred' }}
      </p>
    </div>

    <div v-if="family">
      <pre><code>{{ family }}</code></pre>
    </div>
  </div>
</template>
