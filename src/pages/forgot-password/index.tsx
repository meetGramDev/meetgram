import { ForgotPasswordForm, useForgotPasswordMutation } from '@/features/auth/forgotPassword'
import { ForgotPasswordFormData } from '@/features/auth/forgotPassword/lib/useForgotPassword'
import { getAuthLayout } from '@/widgets/layouts'

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation()

  const onSubmit = (data: { token: null | string } & ForgotPasswordFormData) => {
    debugger
    forgotPassword({
      baseUrl: 'http://localhost:3000/',
      email: data.email,
      recaptcha: data.token,
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <div>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </div>
  )
}

ForgotPassword.getLayout = getAuthLayout

export default ForgotPassword
