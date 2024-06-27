import { useForm } from 'react-hook-form'

import {
  emailConstraint,
  passwordConstraint,
  userNameConstraint,
} from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ErrorSineUp } from '../../../../../locales/en'

/*todo this I redid*/
const getSinUpSchema = (translate: ErrorSineUp) => {
  return z
    .object({
      confirmPassword: passwordConstraint,
      email: emailConstraint,
      isApproved: z.boolean().refine(val => val, {
        message: translate.isApprovedMassage,
      }),
      password: passwordConstraint,
      userName: userNameConstraint,
    })
    .refine(data => data.password === data.confirmPassword, {
      message: translate.refineMassage,
      path: ['confirmPassword'],
    })
}

const signUpSchema = z
  .object({
    confirmPassword: passwordConstraint,
    email: emailConstraint,
    isApproved: z.boolean().refine(val => val, {
      message: 'Please read and accept the terms and conditions',
    }),
    password: passwordConstraint,
    userName: userNameConstraint,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>

export const useSignUp = (translate: ErrorSineUp) => {
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
    resolver: zodResolver(getSinUpSchema(translate)),
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
