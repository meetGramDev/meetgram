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
    password: passwordConstraint,
    username: userNameConstraint,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>

export const useSignUp = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormData>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
      username: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signUpSchema),
  })

  return { errors, handleSubmit, register }
}
