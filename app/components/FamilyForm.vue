<script setup lang="ts">
import type { TFamily } from '@/types'
import { useForm } from '@tanstack/vue-form'
import { toast } from 'vue-sonner'

const props = withDefaults(
  defineProps<{
    open?: boolean
    family?: TFamily | null
  }>(),
  { open: false, family: null }
)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { onError } = useFormError()
const { mutateAsync, isPending } = useFamiliesMutation()

const form = useForm({
  defaultValues: {
    id: null as number | null,
    name: '',
    slug: '',
    description: '',
  },
  onSubmit({ value }) {
    mutateAsync(value, {
      onError: (error) => onError(error, form),
      onSuccess: () => {
        toast.success(props.family ? 'Family updated.' : 'Family created.')
        emit('update:open', false)
      },
    })
  },
})

function isInvalid(field: any) {
  return field.state.meta.isTouched && !field.state.meta.isValid
}

const errors = form.useStore((v) => v.errors)

watch(
  () => [props.open, props.family] as const,
  ([open, family]) => {
    if (open) {
      form.setFieldValue('id', family?.id ?? null)
      form.setFieldValue('name', family?.name ?? '')
      form.setFieldValue('slug', family?.slug ?? '')
      form.setFieldValue('description', family?.description ?? '')
    }
  },
  { immediate: true }
)

function onNameChange(value: string) {
  form.setFieldValue('name', value)
  if (!props.family) {
    form.setFieldValue('slug', slugify(value))
  }
}

function onClose() {
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ family ? 'Edit Family' : 'Create Family' }}
        </DialogTitle>
        <DialogDescription>
          {{
            family
              ? 'Update the family information below.'
              : 'Fill in the details to create a new family.'
          }}
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-4" @submit.prevent="form.handleSubmit">
        <Alert v-if="errors.length" variant="destructive">
          <Icon name="lucide:alert-circle" />
          <AlertTitle> Error while {{ family ? 'updating' : 'creating' }} family </AlertTitle>
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
                placeholder="Enter family name"
                @blur="field.handleBlur"
                @input="onNameChange(($event.target as HTMLInputElement).value)"
              />
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <form.Field name="slug">
          <template #default="{ field }">
            <Field class="gap-1" :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">Slug</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                :aria-invalid="isInvalid(field)"
                :disabled="!!family"
                placeholder="Slug (generated from name)"
                @blur="field.handleBlur"
                @input="field.handleChange(($event.target as HTMLInputElement).value)"
              />
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <form.Field name="description">
          <template #default="{ field }">
            <Field class="gap-1" :data-invalid="isInvalid(field)">
              <FieldLabel :for="field.name">Description</FieldLabel>
              <Input
                :id="field.name"
                :name="field.name"
                :model-value="field.state.value"
                :aria-invalid="isInvalid(field)"
                placeholder="Enter description (optional)"
                @blur="field.handleBlur"
                @input="field.handleChange(($event.target as HTMLInputElement).value)"
              />
              <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
            </Field>
          </template>
        </form.Field>

        <div class="flex justify-end gap-2">
          <Button type="button" variant="outline" @click="onClose"> Cancel </Button>
          <Button type="submit" :disabled="isPending">
            {{ family ? 'Update' : 'Create' }}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
