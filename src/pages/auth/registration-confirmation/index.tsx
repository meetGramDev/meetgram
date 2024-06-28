import { useEffect } from 'react'

import {
  useRegistrationConfirmationMutation,
  useRegistrationEmailResendingMutation,
} from '@/features/auth/registrationConfirmation/model/services/registration.service'
import SignInImg from '@/shared/assets/img/sign-up_bro.png'
import Img from '@/shared/assets/img/time-management.png'
import { SIGN_IN } from '@/shared/config/router'
import { NextPageWithLayout, isErrorWithMessage, isFetchBaseQueryError } from '@/shared/types'
import { Button } from '@/shared/ui/button/button'
import { getAuthLayout } from '@/widgets/layouts'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import s from './index.module.scss'

const RegistrationConfirmation: NextPageWithLayout = () => {
  const [registrationConfirmation, { error, isLoading }] = useRegistrationConfirmationMutation()
  const [registrationEmailResending] = useRegistrationEmailResendingMutation()
  const params = useSearchParams()

  const resetVerificationLink = async () => {
    const email = localStorage.getItem('email')

    try {
      email !== null && (await registrationEmailResending({ email }).unwrap())
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('email')
        }
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)

        console.error(errMsg, { variant: 'error' })
      } else if (isErrorWithMessage(err)) {
        console.error(err.message, { variant: 'error' })
      }
    }
  }

  useEffect(() => {
    const confirmationCode = params?.get('code')

    if (confirmationCode) {
      registrationConfirmation({ confirmationCode })
        .unwrap()
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          if (isFetchBaseQueryError(err)) {
            const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)

            console.error(errMsg, { variant: 'error' })
          } else if (isErrorWithMessage(err)) {
            console.error(err.message, { variant: 'error' })
          }
        })
    }
  }, [params, registrationConfirmation])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* @ts-ignore */}
      {error && error.status === 400 ? (
        <div className={s.root}>
          <div className={s.textWrapper}>
            <h2 className={s.title}>Email verification link expired</h2>
            <div>
              Looks like the verification link has expired. Not to worry, we can send the link again
            </div>
            <Button onClick={resetVerificationLink}>Resend verification link</Button>
          </div>
          <Image alt={'img'} className={s.img} src={Img} />
        </div>
      ) : (
        <div className={s.root}>
          <div className={s.textWrapper}>
            <h2 className={s.title}>Congratulations!</h2>
            <div>Your email has been confirmed</div>
            <Button as={Link} href={SIGN_IN}>
              Sign In
            </Button>
          </div>
          <Image alt={'img'} className={s.img} src={SignInImg} />
        </div>
      )}
    </div>
  )
}

RegistrationConfirmation.getLayout = getAuthLayout

export default RegistrationConfirmation
