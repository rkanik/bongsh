<template>
  <div class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-4xl">
      <AuthenticationForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthenticationForm from '@/components/forms/AuthenticationForm.vue'
</script>
