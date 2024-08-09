import { useForm } from 'react-hook-form'

import { getEmailConstraint } from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ErrorEmail } from '../../../../../public/locales/en'

const getForgotPasswordSchema = (errorEmail?: ErrorEmail) => {
  return z.object({
    email: getEmailConstraint(errorEmail),
  })
}

const forgotPasswordSchema = getForgotPasswordSchema()

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const useForgotPassword = (errorEmail: ErrorEmail) => {
  const {
    formState: { errors, isDirty, isValid, touchedFields },
    handleSubmit,
    register,
    setError,
    trigger,
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(getForgotPasswordSchema(errorEmail)),
  })

  return { errors, handleSubmit, isDirty, isValid, register, setError, touchedFields, trigger }
}
