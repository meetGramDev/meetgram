import { useLoginMutation } from '@/entities/user'
import { SignInForm } from '@/features/auth/signIn/ui'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const SignIn: NextPageWithLayout = () => {
  const [login, { error, isError, isLoading }] = useLoginMutation()

  return (
    <SignInForm
      onSubmit={data => {
        login(data)
          .unwrap()
          .then(res => console.log(res))
          .catch(err => console.error(err))
      }}
    />
  )
}

SignIn.getLayout = getAuthLayout

export default SignIn
