import { useForm } from 'react-hook-form'

import {
  getEmailConstraint,
  getPasswordConstraint,
  getUserNameConstraint,
} from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ErrorsTr } from '../../../../../public/locales/en'

const getSinUpSchema = (errorTr: ErrorsTr | undefined = undefined) => {
  const errorSignUp = errorTr?.errorSignUp
  const errorValidationFields = errorTr?.errorValidationFields
  const errorEmail = errorTr?.errorEmail

  return z
    .object({
      confirmPassword: getPasswordConstraint(errorValidationFields),
      email: getEmailConstraint(errorEmail),
      isApproved: z.boolean().refine(val => val, {
        message: errorSignUp
          ? errorSignUp.isApprovedMassage
          : 'Please read and accept the terms and conditions',
      }),
      password: getPasswordConstraint(errorValidationFields),
      userName: getUserNameConstraint(errorValidationFields),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: errorSignUp ? errorSignUp.refineMessage : "Passwords don't match",
      path: ['confirmPassword'],
    })
}

const signUpSchema = getSinUpSchema()

export type SignUpFormData = z.infer<typeof signUpSchema>

export const useSignUp = (errorsTr: ErrorsTr) => {
  const {
    clearErrors,
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    handleSubmit,
    register,
    setError,
  } = useForm<SignUpFormData>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      isApproved: false,
      password: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(getSinUpSchema(errorsTr)),
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
