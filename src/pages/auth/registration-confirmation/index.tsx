import { useEffect } from 'react'

import { ResendEmailPage } from '@/features/auth/registrationConfirmation'
import { useRegistrationConfirmationMutation } from '@/features/auth/registrationConfirmation/model/services/registration.service'
import SignInImg from '@/shared/assets/img/sign-up_bro.png'
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
  const params = useSearchParams()

  useEffect(() => {
    const confirmationCode = params?.get('code')

    if (confirmationCode) {
      registrationConfirmation({ confirmationCode })
        .unwrap()
        .then(() => {
          console.log('res')
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
      {error?.data.statusCode === 400 ? (
        <ResendEmailPage />
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
