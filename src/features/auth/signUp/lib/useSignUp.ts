import { useForm } from 'react-hook-form'

import {
  emailConstraint,
  passwordConstraint,
  userNameConstraint,
} from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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

export const useSignUp = () => {
  const {
    clearErrors,
    control,
    formState: { errors, isDirty, isValid },
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
    resolver: zodResolver(signUpSchema),
  })

  return { clearErrors, control, errors, handleSubmit, isDirty, isValid, register, setError }
}
