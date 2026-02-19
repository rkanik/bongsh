<template>
  <div class="p-4">
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repudiandae eum quia,
      expedita molestiae dolores, illo illum nesciunt delectus voluptates sit fuga reiciendis nam
      consequatur officia laborum cumque exercitationem vero!
    </div>
    <ul>
      <li v-for="user in users" :key="user.id">
        <p>{{ user.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const serverUrl = import.meta.env.VITE_SERVER_URL
const users = ref<any[]>([])

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
