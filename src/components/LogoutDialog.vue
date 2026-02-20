<template>
  <AlertDialog v-model:open="open">
    <AlertDialogTrigger as-child>
      <Button ref="logoutButton" v-show="!hidden" variant="outline">Logout</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Logout</AlertDialogTitle>
        <AlertDialogDescription> Are you sure you want to logout? </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="onLogout">Logout</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
<script setup lang="ts">
const authStore = useAuthStore()

const props = defineProps<{
  open?: boolean
  hidden?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const open = useVModel(props, 'open')

function onLogout() {
  authStore.user = undefined
  authStore.token = undefined
  router.replace('/auth')
}
</script>
