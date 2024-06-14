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
    isApproved: z.boolean(),
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
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
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

  return { errors, handleSubmit, isDirty, isValid, register }
}
