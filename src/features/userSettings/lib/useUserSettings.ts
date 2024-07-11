import { useForm } from 'react-hook-form'

import {
  getEmailConstraint,
  getPasswordConstraint,
  getUserNameConstraint,
} from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ErrorsTr } from '../../../../public/locales/en'

const getUserSettingsSchema = (errorTr: ErrorsTr | undefined = undefined) => {
  const errorSignUp = errorTr?.errorSignUp
  const errorValidationFields = errorTr?.errorValidationFields
  const errorEmail = errorTr?.errorEmail

  return z
    .object({
      firstName: getEmailConstraint(errorEmail),
      lastName: getPasswordConstraint(errorValidationFields),
      userName: getUserNameConstraint(errorValidationFields),
    })
    .refine(data => data.firstName === data.firstName, {
      message: errorSignUp ? errorSignUp.refineMessage : "Passwords don't match",
      path: ['confirmPassword'],
    })
}

const userSettingsSchema = getUserSettingsSchema()

export type UserSettingsFormData = z.infer<typeof userSettingsSchema>

export const useUserSettings = (errorsTr: ErrorsTr) => {
  const {
    clearErrors,
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    handleSubmit,
    register,
    setError,
  } = useForm<UserSettingsFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
    },

    mode: 'onBlur',
    resolver: zodResolver(getUserSettingsSchema(errorsTr)),
  })

  return {
    clearErrors,
    control,
    errors,
    getValues,
    handleSubmit,
    isDirty,
    isValid,
    register,
    setError,
  }
}
