<template>
  <AlertDialog v-model:open="open">
    <AlertDialogTrigger as-child>
      <Button ref="logoutButton" v-show="!hidden" variant="outline">Logout</Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="bg-neutral-800">
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
const props = defineProps<{
  open?: boolean
  hidden?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const open = useVModel(props, 'open')

const { clear } = useUserSession()
const route = useRoute()
const onLogout = async () => {
  await clear()
  reloadNuxtApp({
    path: route.path,
  })
}
</script>
