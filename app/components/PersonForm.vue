<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { toast } from 'vue-sonner'
import type { TFamily, TPerson } from '@@/shared/types'
import type { TZPerson } from '~/composables/useFamilyPersonsMutation'

const props = withDefaults(
  defineProps<{
    open?: boolean
    family?: TFamily | null
  }>(),
  { open: false, family: null }
)

const emit = defineEmits<{
  'update:open': [value: boolean]
  success: []
}>()

const familyId = computed(() => props.family?.id ?? props.family?.slug ?? '')
const { onError } = useFormError()
const { mutateAsync, isPending } = useFamilyPersonsMutation(familyId)

const form = useForm({
  defaultValues: {
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '' as '' | 'MALE' | 'FEMALE' | 'OTHER',
    isLiving: true,
    linkAs: 'none' as 'none' | 'child' | 'parent',
    relatedPersonId: undefined as number | undefined,
    parentType: 'FATHER' as 'FATHER' | 'MOTHER' | 'ADOPTIVE',
  },
  onSubmit({ value }) {
    const payload: TZPerson = {
      name: value.name,
      email: value.email || undefined,
      phone: value.phone || undefined,
      dob: value.dob || undefined,
      gender: value.gender || undefined,
      isLiving: value.isLiving,
      linkAs: value.linkAs,
      relatedPersonId: value.relatedPersonId,
      parentType: value.parentType,
    }
    mutateAsync(payload, {
      onError: (error) => onError(error, form),
      onSuccess: () => {
        toast.success('Person added to family.')
        emit('update:open', false)
        emit('success')
      },
    })
  },
})

function isInvalid(field: any) {
  return field.state.meta.isTouched && !field.state.meta.isValid
}

const errors = form.useStore((v) => v.errors)

const personOptions = computed(() => {
  const persons = (props.family?.persons ?? []) as TPerson[]
  return persons.map((p) => ({ id: p.id, name: p.name }))
})

watch(
  () => props.open,
  (open) => {
    if (open) {
      form.setFieldValue('name', '')
      form.setFieldValue('email', '')
      form.setFieldValue('phone', '')
      form.setFieldValue('dob', '')
      form.setFieldValue('gender', '')
      form.setFieldValue('isLiving', true)
      form.setFieldValue('linkAs', 'none')
      form.setFieldValue('relatedPersonId', undefined)
      form.setFieldValue('parentType', 'FATHER')
    }
  },
  { immediate: true }
)

const values = form.useStore((v) => v.values)

function onClose() {
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add person to family</DialogTitle>
        <DialogDescription>
          Fill in the details and optionally link this person as a parent or child of someone in the
          family.
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-4" @submit.prevent="form.handleSubmit">
        <Alert v-if="errors.length" variant="destructive">
          <Icon name="lucide:alert-circle" />
          <AlertTitle>Error while adding person</AlertTitle>
          <AlertDescription>
            <p>{{ errors.join(', ') }}</p>
          </AlertDescription>
        </Alert>

        <form.Field name="name">
          <template #default="{ field }">
            <Field class="gap-1" :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">Name</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                :aria-invalid="isInvalid(field)"
                placeholder="Full name"
                @blur="field.handleBlur"
                @input="field.handleChange(($event.target as HTMLInputElement).value)"
              />
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <form.Field name="email">
          <template #default="{ field }">
            <Field class="gap-1" :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">Email</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                type="email"
                :model-value="field.state.value"
                :aria-invalid="isInvalid(field)"
                placeholder="Email (optional)"
                @blur="field.handleBlur"
                @input="field.handleChange(($event.target as HTMLInputElement).value)"
              />
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <form.Field name="phone">
          <template #default="{ field }">
            <Field class="gap-1" :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">Phone</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                :aria-invalid="isInvalid(field)"
                placeholder="Phone (optional)"
                @blur="field.handleBlur"
                @input="field.handleChange(($event.target as HTMLInputElement).value)"
              />
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <form.Field name="dob">
          <template #default="{ field }">
            <Field class="gap-1" :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">Date of birth</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                type="date"
                :model-value="field.state.value"
                :aria-invalid="isInvalid(field)"
                @blur="field.handleBlur"
                @input="field.handleChange(($event.target as HTMLInputElement).value)"
              />
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <form.Field name="gender">
          <template #default="{ field }">
            <Field class="gap-1" :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">Gender</FieldLabel>
              <select
                :id="field.name"
                :name="field.name"
                :value="field.state.value"
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                @blur="field.handleBlur"
                @change="field.handleChange(($event.target as HTMLSelectElement).value)"
              >
                <option value="">Not specified</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <form.Field name="isLiving">
          <template #default="{ field }">
            <Field class="flex flex-row items-center gap-2">
              <input
                :id="field.name"
                type="checkbox"
                :checked="field.state.value"
                class="size-4 rounded border-input"
                @change="field.handleChange(($event.target as HTMLInputElement).checked)"
              />
              <FieldLabel :for="field.name" class="mb-0!">Living</FieldLabel>
            </Field>
          </template>
        </form.Field>

        <form.Field name="linkAs">
          <template #default="{ field }">
            <Field class="gap-1" :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">Add as</FieldLabel>
              <select
                :id="field.name"
                :name="field.name"
                :value="field.state.value"
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                @blur="field.handleBlur"
                @change="
                  field.handleChange(
                    ($event.target as HTMLSelectElement).value as 'none' | 'child' | 'parent'
                  )
                "
              >
                <option value="none">Just add to family (no relation)</option>
                <option value="child">Child of someone in the family</option>
                <option value="parent">Parent of someone in the family</option>
              </select>
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <template v-if="values.linkAs === 'child' || values.linkAs === 'parent'">
          <form.Field name="relatedPersonId">
            <template #default="{ field }">
              <Field class="gap-1" :data-invalid="isInvalid(field)">
                <FieldLabel :for="field.name">
                  {{ values.linkAs === 'child' ? 'Parent' : 'Child' }} (select person)
                </FieldLabel>
                <select
                  :id="field.name"
                  :name="field.name"
                  :value="field.state.value ?? ''"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  @blur="field.handleBlur"
                  @change="
                    field.handleChange(
                      ($event.target as HTMLSelectElement).value
                        ? Number(($event.target as HTMLSelectElement).value)
                        : undefined
                    )
                  "
                >
                  <option value="">Select...</option>
                  <option v-for="p in personOptions" :key="p.id" :value="p.id">
                    {{ p.name }}
                  </option>
                </select>
                <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
              </Field>
            </template>
          </form.Field>

          <form.Field v-if="values.linkAs !== 'none'" name="parentType">
            <template #default="{ field }">
              <Field class="gap-1" :data-invalid="isInvalid(field)">
                <FieldLabel :for="field.name">Parent type</FieldLabel>
                <select
                  :id="field.name"
                  :name="field.name"
                  :value="field.state.value"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  @blur="field.handleBlur"
                  @change="
                    field.handleChange(
                      ($event.target as HTMLSelectElement).value as 'FATHER' | 'MOTHER' | 'ADOPTIVE'
                    )
                  "
                >
                  <option value="FATHER">Father</option>
                  <option value="MOTHER">Mother</option>
                  <option value="ADOPTIVE">Adoptive</option>
                </select>
                <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
              </Field>
            </template>
          </form.Field>
        </template>

        <div class="flex justify-end gap-2">
          <Button type="button" variant="outline" @click="onClose">Cancel</Button>
          <Button type="submit" :disabled="isPending">Add person</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
