import { SignInForm } from '@/features/auth/signIn/ui'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const SignIn: NextPageWithLayout = () => {
  return <SignInForm onSubmit={data => alert(JSON.stringify(data))} />
}

SignIn.getLayout = getAuthLayout

export default SignIn
