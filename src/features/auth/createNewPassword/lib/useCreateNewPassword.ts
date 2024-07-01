import { useForm } from 'react-hook-form'

import { getPasswordConstraint } from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ErrorsTr } from '../../../../../public/locales/en'

const getCreateNewPasswordSchema = (errorTr: ErrorsTr | undefined = undefined) => {
  const errorValidationFields = errorTr?.errorValidationFields
  const errorNewPassword = errorTr?.errorNewPassword

  return z
    .object({
      confirmPassword: getPasswordConstraint(errorValidationFields),
      password: getPasswordConstraint(errorValidationFields),
    })
    .refine(data => data.confirmPassword == data.password, {
      message: errorNewPassword ? errorNewPassword.refineMessage : 'Passwords must match',
      path: ['confirmPassword'],
    })
}

const createNewPasswordSchema = getCreateNewPasswordSchema()

export type CreateNewPasswordValues = z.infer<typeof createNewPasswordSchema>

export const useCreateNewPassword = (errorsTr: ErrorsTr) => {
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
    resolver: zodResolver(getCreateNewPasswordSchema(errorsTr)),
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
