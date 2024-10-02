import { useForm } from 'react-hook-form'

import { getEmailConstraint, getPasswordSignInConstraint } from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ErrorsTr } from '../../../../../public/locales/en'

const getSignInSchema = (errorTr: ErrorsTr | undefined = undefined) => {
  const errorValidationFields = errorTr?.errorValidationFields
  const errorEmail = errorTr?.errorEmail

  return z.object({
    email: getEmailConstraint(errorEmail),
    password: getPasswordSignInConstraint(errorValidationFields),
  })
}

const signInSchema = getSignInSchema()

export type SignInFields = z.infer<typeof signInSchema>

export function useSignIn(errorsTr: ErrorsTr) {
  const { formState, getValues, handleSubmit, register, setError } = useForm<SignInFields>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(getSignInSchema(errorsTr)),
  })

  return { formState, getValues, handleSubmit, register, setError }
}
