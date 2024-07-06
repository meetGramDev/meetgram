import { useEffect } from 'react'

import {
  ResendEmail,
  useRegistrationConfirmationMutation,
} from '@/features/auth/registrationConfirmation'
import { ConfirmEmail } from '@/features/auth/registrationConfirmation/ui/ConfirmEmail'
import { NextPageWithLayout, isFetchBaseQueryError } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import { useSearchParams } from 'next/navigation'

const RegistrationConfirmation: NextPageWithLayout = () => {
  const [registrationConfirmation, { error, isLoading, isSuccess }] =
    useRegistrationConfirmationMutation()
  const params = useSearchParams()

  useEffect(() => {
    const data = async () => {
      const confirmationCode = params?.get('code')

      try {
        confirmationCode && (await registrationConfirmation({ confirmationCode }).unwrap())
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)

          console.error(errMsg, { variant: 'error' })
        }
      }
    }

    data()
  }, [params, registrationConfirmation])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {isSuccess && <ConfirmEmail />}
      {error && <ResendEmail />}
    </>
  )
}

RegistrationConfirmation.getLayout = getAuthLayout

export default RegistrationConfirmation
