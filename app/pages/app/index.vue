<template>
  <div>
    <div>
      {{ ready ? 'Ready' : 'Not Ready' }}
      {{ loggedIn ? 'Logged In' : 'Logged Out' }}

      <pre><code>{{ user }}</code></pre>
    </div>

    <AuthState v-slot="{ loggedIn, clear }">
      <button v-if="loggedIn" @click="clear">Logout</button>
      <NuxtLink v-else to="/auth">Login</NuxtLink>
    </AuthState>

    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sed quibusdam aut ipsam iste
      illum quos repellendus porro doloribus. Illum porro non quis, distinctio est obcaecati aliquam
      quibusdam in maxime?
    </div>
  </div>
</template>

<script setup lang="ts">
const { ready, loggedIn, user, fetch: fetchUserSession } = useUserSession()

definePageMeta({
  layout: 'app-layout',
})
</script>
