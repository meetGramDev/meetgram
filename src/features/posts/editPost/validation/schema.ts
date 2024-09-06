import { getEditPostDescriptionConstraint } from '@/shared/const/validationFields'
import { z } from 'zod'

export const getEditPostSchema = () => {
  return z.object({
    description: getEditPostDescriptionConstraint(),
  })
}

const editPostSchema = getEditPostSchema()

export type EditPostField = z.infer<typeof editPostSchema>
