import { useState } from 'react'

import { SignUpForm, SignUpFormData, useSignUpMutation } from '@/features/auth/signUp'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'

const SignUp: NextPageWithLayout = () => {
  // const [signUp] = useSignUpMutation()

  const onSubmit = async ({ confirmPassword, isApproved, ...data }: SignUpFormData) => {
    // signUp({ ...data })
    //   .unwrap()
    //   .then(() => {
    //     alert(`We have sent a link to confirm your email to ${data.email}`)
    //   })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <SignUpForm onSubmit={onSubmit} />
    </div>
  )
}

SignUp.getLayout = getAuthLayout

export default SignUp
