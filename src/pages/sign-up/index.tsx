import { useState } from 'react'

import {
  SignUpForm,
  SignUpFormData,
  authSliceActions,
  getEmail,
  useSignUpMutation,
} from '@/features/auth/signUp'
import { Tr } from '@/hooks/useLangSwitcher'
import { ServerBadResponse } from '@/shared/api'
import { useAppDispatch, useAppSelector } from '@/shared/config/storeHooks'
import { NextPageWithLayout, isFetchBaseQueryError } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Dialog } from '@/shared/ui/dialog'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

import s from './index.module.scss'

const SignUp: NextPageWithLayout = () => {
  const [signUp] = useSignUpMutation()
  const [error, setError] = useState([])
  const email = useAppSelector(getEmail)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const locale = useRouter().locale
  const { signUpLang } = Tr(locale)

  const onSubmit = async ({ confirmPassword, isApproved, ...data }: SignUpFormData) => {
    try {
      await signUp({ ...data }).unwrap()
      dispatch(authSliceActions.setEmail(data.email))
      setOpen(true)
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errMsg =
          'error' in error
            ? error.error
            : JSON.stringify((error.data as ServerBadResponse).messages)

        setError(JSON.parse(errMsg))
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <SignUpForm error={error} onSubmit={onSubmit} />
      <>
        <Dialog onOpenChange={setOpen} open={open} title={'Email sent'}>
          <div className={s.modalContent}>
            <div>
              {signUpLang.aler}
              {email}
            </div>
            <Button onClick={() => setOpen(false)} style={{ alignSelf: 'flex-end' }}>
              Ok
            </Button>
          </div>
        </Dialog>
      </>
    </div>
  )
}

SignUp.getLayout = getAuthLayout

export default SignUp
