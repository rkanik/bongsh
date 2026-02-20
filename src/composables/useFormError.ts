import type { AnyFormApi } from '@tanstack/vue-form'
import { AxiosError } from 'axios'
import { z } from 'zod'

export const useFormError = () => {
  const onError = (error: Error, form: AnyFormApi) => {
    let issues: z.core.$ZodIssue[] = []
    let message = error.message ?? 'Something went wrong'
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        message = error.response?.data?.message
      }
      if (error.response?.status === 422) {
        issues = error.response?.data?.issues ?? []
      }
    }
    issues.forEach((issue) => {
      const path = issue.path[0] as string
      form.setFieldMeta(path, (v) => ({
        ...v,
        errorMap: {
          onSubmit: issue.message,
        },
      }))
    })
    if (!issues.length) {
      form.setErrorMap({
        onSubmit: message,
      })
    }
  }
  return {
    onError,
  }
}
