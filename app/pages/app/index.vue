<template>
  <div>
    <button v-if="loggedIn" @click="onLogout">Logout</button>
    <NuxtLink v-else to="/auth">Login</NuxtLink>

    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sed quibusdam aut ipsam iste
      illum quos repellendus porro doloribus. Illum porro non quis, distinctio est obcaecati aliquam
      quibusdam in maxime?
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app-layout',
})

const { loggedIn, clear } = useUserSession()

const onLogout = async () => {
  await clear()
  await navigateTo('/auth')
}
</script>
