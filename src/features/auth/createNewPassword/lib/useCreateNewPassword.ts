import { useForm } from 'react-hook-form'

import { passwordConstraint } from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type CreateNewPasswordValues = z.infer<typeof createNewPasswordSchema>

const createNewPasswordSchema = z
  .object({
    confirmPassword: passwordConstraint,
    password: passwordConstraint,
  })
  .refine(data => data.confirmPassword == data.password, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export const useCreateNewPassword = () => {
  const {
    clearErrors,
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<CreateNewPasswordValues>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(createNewPasswordSchema),
  })

  return {
    clearErrors,
    control,
    errors,
    handleSubmit,
    isDirty,
    isValid,
    register,
    setError,
  }
}
