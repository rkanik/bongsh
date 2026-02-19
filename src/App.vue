<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'

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
    <Button>Click me</Button>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <p>{{ user.name }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
