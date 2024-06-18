import { useForm } from 'react-hook-form'

import { emailConstraint } from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  captchaToken: z.string().optional(),
  email: emailConstraint,
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const useForgotPassword = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordSchema),
  })

  return { errors, handleSubmit, register, setError }
}
