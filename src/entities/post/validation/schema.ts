import { getEditPostDescriptionConstraint } from '@/shared/const/validationFields'
import { z } from 'zod'

export const getPostDescriptionSchema = () => {
  return z.object({
    description: getEditPostDescriptionConstraint(),
  })
}

const PostDescriptionSchema = getPostDescriptionSchema()

export type PostDescriptionField = z.infer<typeof PostDescriptionSchema>
