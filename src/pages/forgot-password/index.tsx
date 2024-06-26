import { ForgotPasswordForm, useForgotPasswordMutation } from '@/features/auth/forgotPassword'
import { ForgotPasswordFormData } from '@/features/auth/forgotPassword/lib/useForgotPassword'
import { Nullable } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const ForgotPassword = () => {
  const onSubmit = (data: { token: Nullable<string> } & ForgotPasswordFormData) => {}

  return (
    <div>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </div>
  )
}

ForgotPassword.getLayout = getAuthLayout

export default ForgotPassword
