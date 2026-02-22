<script setup lang="ts">
import OrganizationChart from 'primevue/organizationchart'
import type { TFamily, TPerson } from '@@/shared/types'

const props = defineProps<{
  family: TFamily | null
}>()

/** API returns children as { childId, child }[] */
type ParentChildRelation = { childId: number; child: PersonWithRelations }
type PersonWithRelations = TPerson & { children?: ParentChildRelation[] }

type TreeNode = {
  label: string
  key: number
  data: TPerson
  children?: TreeNode[]
}

function buildFamilyTree(data: TPerson[]): TreeNode[] {
  const map = new Map<number, TreeNode>()

  // Create node map
  data.forEach((p) => {
    map.set(p.id, {
      key: p.id,
      label: p.name,
      data: p,
      children: [],
    })
  })

  // Attach children using parents.childId
  data.forEach((p) => {
    p.parents?.forEach((rel) => {
      const parent = map.get(rel.parentId)
      const child = map.get(rel.childId)

      if (parent && child) {
        parent.children?.push(child)
      }
    })
  })

  // Roots = persons who are not child of anyone
  const childIds = new Set<number>()
  data.forEach((p) => {
    p.parents?.forEach((rel) => {
      childIds.add(rel.childId)
    })
  })

  return data.filter((p) => !childIds.has(p.id)).map((p) => map.get(p.id)!)
}

/** OrganizationChart expects a single root node */
const treeRoot = computed((): TreeNode | null => {
  return {
    label: 'Family',
    key: 0,
    data: {} as TPerson,
    children: buildFamilyTree(props.family?.persons ?? []),
  }
})
</script>

<template>
  <div class="family-tree overflow-auto rounded-lg border bg-card p-4">
    <OrganizationChart v-if="treeRoot" :value="treeRoot" collapsible class="border-0">
      <template #default="slotProps">
        <div class="flex flex-col items-center rounded-lg border bg-background px-4 py-3 shadow-sm">
          <div class="font-semibold text-foreground">
            {{ slotProps.node.data?.name ?? slotProps.node.label }}
          </div>
          <div v-if="slotProps.node.data?.dob" class="text-muted-foreground text-sm">
            {{ new Date(slotProps.node.data.dob).toLocaleDateString() }}
          </div>
          <div v-if="slotProps.node.data?.gender" class="text-muted-foreground text-xs capitalize">
            {{ String(slotProps.node.data.gender).toLowerCase() }}
          </div>
        </div>
      </template>
    </OrganizationChart>
    <div v-else class="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
      <Icon name="lucide:users" class="size-12" />
      <p>No people in this family yet.</p>
      <p class="text-sm">Add a person to start building the tree.</p>
    </div>
  </div>
</template>
