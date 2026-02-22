<script setup lang="ts">
import type { TFamily } from '@@/shared/types'

/** Family shape from list API (dates may be serialized as strings) */
type FamilyRow = Pick<TFamily, 'id' | 'name' | 'slug' | 'description' | 'owner' | 'members'>

definePageMeta({
  layout: 'app-layout',
  pageTransition: {
    name: 'slide-transition',
    mode: 'out-in',
  },
})

const {
  data: families,
  status,
  refresh,
} = useFetch('/api/families', {
  //
})

const isDialogOpen = ref(false)
const editingFamily = ref<TFamily | null>(null)
const deletingFamilyId = ref<number | null>(null)

watch(isDialogOpen, (open) => {
  if (!open) editingFamily.value = null
})

function openCreateDialog() {
  editingFamily.value = null
  isDialogOpen.value = true
}

function openEditDialog(family: FamilyRow, e?: Event) {
  editingFamily.value = family as unknown as TFamily
  isDialogOpen.value = true
}

async function deleteFamily(family: FamilyRow, e?: Event) {
  if (!confirm(`Delete "${family.name}"? This cannot be undone.`)) return
  deletingFamilyId.value = family.id
  try {
    await $fetch(`/api/families/${family.id}`, { method: 'DELETE' })
    await refresh()
  } finally {
    deletingFamilyId.value = null
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <div class="p-4 space-y-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">Families</h1>
          <Button @click="openCreateDialog">Create Family</Button>
        </div>

        <FamilyForm
          v-model:open="isDialogOpen"
          :family="editingFamily"
          @update:open="(v) => !v && refresh()"
        />

        <div v-if="status === 'pending'" class="text-center py-8">Loading...</div>

        <div
          v-else-if="status === 'success' && (!families || families.length === 0)"
          class="text-center py-8 text-muted-foreground"
        >
          No families found. Create your first family to get started.
        </div>

        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FamilyCard
            v-for="family in families"
            :key="family.id"
            :family="family"
            :is-deleting="deletingFamilyId === family.id"
            @edit="openEditDialog"
            @delete="deleteFamily"
          />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
