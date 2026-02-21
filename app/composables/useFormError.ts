import type { AnyFormApi } from '@tanstack/vue-form'
import { z, type ZodIssue } from 'zod'

export const useFormError = () => {
  const onError = (error: any, form: AnyFormApi) => {
    let issues: ZodIssue[] = []
    let message = error.data?.data?.message ?? error.message ?? 'Something went wrong'
    if (error.statusCode === 422) {
      issues = error.data?.data?.issues ?? []
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
