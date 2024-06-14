import { SignUpForm, SignUpFormData } from '@/features/auth/signUp'
import { useSignUpMutation } from '@/features/auth/signUp/model/services/signUp.service'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const SignUp: NextPageWithLayout = () => {
  const [signUp] = useSignUpMutation()

  const onSubmit = ({ confirmPassword, ...data }: SignUpFormData) => {
    const args = {
      baseUrl: 'http://localhost:3000',
      ...data,
    }

    signUp(args)
      .unwrap()
      .then(res => {
        alert(JSON.stringify(res))
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <SignUpForm onSubmit={onSubmit} />
    </div>
  )
}

SignUp.getLayout = getAuthLayout

export default SignUp
