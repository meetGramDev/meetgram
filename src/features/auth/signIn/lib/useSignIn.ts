import { useForm } from 'react-hook-form'

import { emailConstraint, passwordSignInConstraint } from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signInSchema = z.object({
  email: emailConstraint,
  password: passwordSignInConstraint,
})

export type SignInFields = z.infer<typeof signInSchema>

export function useSignIn() {
  const { formState, getValues, handleSubmit, register, setError } = useForm<SignInFields>({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInSchema),
  })

  return { formState, getValues, handleSubmit, register, setError }
}
