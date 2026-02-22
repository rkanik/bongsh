import type { TPerson } from '@@/shared/types'

export type TZPerson = {
  name: string
  email?: string
  phone?: string
  dob?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  isLiving?: boolean
  linkAs?: 'none' | 'child' | 'parent'
  relatedPersonId?: number
  parentType?: 'FATHER' | 'MOTHER' | 'ADOPTIVE'
}

export const useFamilyPersonsMutation = (familyId?: Ref<string | number>) => {
  const route = useRoute()
  const id = computed(() => {
    if (familyId?.value !== undefined && familyId?.value !== '') return String(familyId.value)
    return String(route.params.id ?? '')
  })
  return useMutation({
    mutationKey: ['families', id.value, 'persons'],
    mutationFn: async (body: TZPerson) => {
      return await $fetch<TPerson>(`/api/families/${id.value}/persons`, {
        body,
        method: 'POST',
      })
    },
  })
}
