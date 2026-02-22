<script setup lang="ts">
import type { TFamily, TFamilyMember } from '@@/shared/types'
import { initials } from '@@/shared/utils/initials'
import type { ActionsMenuItem } from '@/components/ActionsMenu.vue'

/** Family shape from list API (dates may be serialized as strings) */
type FamilyRow = Pick<TFamily, 'id' | 'name' | 'slug' | 'description' | 'owner' | 'members'>

const props = defineProps<{
  family: FamilyRow
  isDeleting?: boolean
}>()

const emit = defineEmits<{
  edit: [family: FamilyRow, e?: Event]
  delete: [family: FamilyRow, e?: Event]
}>()

const familyActions = computed<ActionsMenuItem<FamilyRow>[]>(() => [
  {
    id: 'edit',
    label: 'Edit',
    icon: 'lucide:pencil',
    onClick(payload: FamilyRow, e: Event) {
      emit('edit', payload, e)
    },
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: 'lucide:trash-2',
    variant: 'destructive',
    disabled: props.isDeleting,
    onClick(payload: FamilyRow, e: Event) {
      emit('delete', payload, e)
    },
  },
])

/** Members to show as avatars: owner first (if present), then members excluding owner */
function avatarPeople(family: FamilyRow): { name: string; role: string; avatar?: string | null }[] {
  const out: { name: string; role: string; avatar?: string | null }[] = []
  if (family.owner) {
    out.push({
      name: family.owner.name ?? 'Owner',
      role: 'Owner',
      avatar: family.owner.avatar,
    })
  }
  const ownerId = family.owner?.id
  const members = (family.members ?? []).filter(
    (m: TFamilyMember) => m.user?.id !== ownerId
  ) as TFamilyMember[]
  for (const m of members) {
    const roleRaw = (m as { role?: string }).role ?? 'Member'
    const role =
      typeof roleRaw === 'string'
        ? roleRaw.charAt(0).toUpperCase() + roleRaw.slice(1).toLowerCase()
        : 'Member'
    out.push({
      name: m.user?.name ?? 'Unknown',
      role,
      avatar: m.user?.avatar,
    })
  }
  return out
}

const people = computed(() => avatarPeople(props.family))
</script>

<template>
  <NuxtLink
    :to="`/app/families/${family.slug}`"
    class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
  >
    <Card class="h-full transition-shadow hover:shadow-md cursor-pointer overflow-hidden">
      <CardHeader class="pb-2">
        <div class="flex items-start gap-2 min-w-0">
          <CardTitle class="truncate flex-1">{{ family.name }}</CardTitle>
          <CardAction>
            <ActionsMenu :items="familyActions" :payload="family" aria-label="Family actions" />
          </CardAction>
        </div>
      </CardHeader>
      <CardContent class="pt-0 space-y-3">
        <p v-if="family.description" class="text-sm text-muted-foreground line-clamp-2">
          {{ family.description }}
        </p>
        <div v-if="people.length > 0" class="flex items-center gap-1 flex-wrap">
          <Tooltip v-for="(person, i) in people" :key="`${family.id}-${i}-${person.name}`">
            <TooltipTrigger as-child>
              <span
                class="relative flex size-8 shrink-0 overflow-hidden rounded-full border-2 border-background bg-muted text-muted-foreground -ml-2 first:ml-0 hover:z-10 hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background transition-all"
              >
                <Avatar class="size-full">
                  <AvatarImage v-if="person.avatar" :src="person.avatar" :alt="person.name" />
                  <AvatarFallback class="text-xs">
                    {{ initials(person.name) }}
                  </AvatarFallback>
                </Avatar>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" class="flex flex-col gap-0.5">
              <span class="font-medium">{{ person.name }}</span>
              <span class="text-xs text-muted-foreground">{{ person.role }}</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  </NuxtLink>
</template>
