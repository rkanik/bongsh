<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import ThemeToggler from './components/ThemeToggler.vue'

const users = ref<any[]>([])
const serverUrl = import.meta.env.VITE_SERVER_URL
onMounted(() => {
  fetch(`${serverUrl}/api/users`)
    .then((response) => response.json())
    .then((data) => {
      users.value = data
    })
    .catch((error) => {
      users.value = []
      console.error(error)
    })
})
</script>

<template>
  <div>
    <div class="p-4 container mx-auto">
      <Button>Click me</Button>
      <ThemeToggler />
      <h1>Users</h1>
      <ul>
        <li v-for="user in users" :key="user.id">
          <p>{{ user.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
