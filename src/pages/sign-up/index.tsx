import { SignUpForm } from '@/features/auth/signUp/ui'
import { SignUpFormData } from '@/features/auth/signUp/ui/useSignUp'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const SignUp: NextPageWithLayout = () => {
  const onSubmit = (data: SignUpFormData) => {
    alert(JSON.stringify(data))
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <SignUpForm onSubmit={onSubmit} />
    </div>
  )
}

SignUp.getLayout = getAuthLayout

export default SignUp
