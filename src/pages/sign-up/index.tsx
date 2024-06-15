import { useState } from 'react'

import { SignUpForm, SignUpFormData, useSignUpMutation } from '@/features/auth/signUp'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const SignUp: NextPageWithLayout = () => {
  const [signUp] = useSignUpMutation()
  const [emailError, setEmailError] = useState<null | string>(null)
  const [userNameError, setUserNameError] = useState<null | string>(null)

  const onSubmit = ({ confirmPassword, isApproved, ...data }: SignUpFormData) => {
    signUp({ ...data })
      .unwrap()
      .then(() => {
        alert(`We have sent a link to confirm your email to ${data.email}`)
      })
      .catch(err => {
        const e = err.data.messages[0]

        if (e.field === 'email') {
          setEmailError(e.message)
        }
        if (e.field === 'userName') {
          setUserNameError(e.message)
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <SignUpForm emailError={emailError} onSubmit={onSubmit} userNameError={userNameError} />
    </div>
  )
}

SignUp.getLayout = getAuthLayout

export default SignUp
