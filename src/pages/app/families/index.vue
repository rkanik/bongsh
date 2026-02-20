<script setup lang="ts">
import type { TFamily } from '@/types'
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import FamilyForm from '@/components/forms/FamilyForm.vue'

const { data: families, isLoading } = useFamiliesQuery()

const isDialogOpen = ref(false)
const editingFamily = ref<TFamily | null>(null)

watch(isDialogOpen, (open) => {
  if (!open) editingFamily.value = null
})

function openCreateDialog() {
  editingFamily.value = null
  isDialogOpen.value = true
}

function openEditDialog(family: TFamily) {
  editingFamily.value = family
  isDialogOpen.value = true
}
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Families</h1>
      <Button @click="openCreateDialog">Create Family</Button>
    </div>

    <FamilyForm v-model:open="isDialogOpen" :family="editingFamily" />

    <div v-if="isLoading" class="text-center py-8">Loading...</div>

    <div
      v-else-if="!families || families.length === 0"
      class="text-center py-8 text-muted-foreground"
    >
      No families found. Create your first family to get started.
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="family in families"
        :key="family.id"
        class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
        @click="openEditDialog(family)"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold">{{ family.name }}</h3>
          <Button variant="ghost" size="sm" @click.stop="openEditDialog(family)"> Edit </Button>
        </div>
        <p class="text-sm text-muted-foreground mb-1">
          <span class="font-medium">Slug:</span> {{ family.slug }}
        </p>
        <p v-if="family.description" class="text-sm text-muted-foreground">
          {{ family.description }}
        </p>
      </div>
    </div>
  </div>
</template>
