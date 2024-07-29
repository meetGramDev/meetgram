import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  ConfirmEmail,
  ResendEmail,
  useRegistrationConfirmationMutation,
} from '@/features/auth/registrationConfirmation'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { NextPageWithLayout, isErrorMessageString } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import { useSearchParams } from 'next/navigation'

const RegistrationConfirmation: NextPageWithLayout = () => {
  const [registrationConfirmation, { error, isLoading, isSuccess }] =
    useRegistrationConfirmationMutation()
  const params = useSearchParams()
  const [isConfirmed, setIsConfirmed] = useState(false)

  useClientProgress(isLoading)

  useEffect(() => {
    const data = async () => {
      if (isConfirmed) {
        return
      }
      const confirmationCode = params?.get('code')

      try {
        confirmationCode &&
          (await registrationConfirmation({ confirmationCode })
            .unwrap()
            .then(() => {
              setIsConfirmed(true)
            }))
      } catch (err) {
        const message = serverErrorHandler(err)

        if (isErrorMessageString(message)) {
          toast.error(message)
        }
      }
    }

    data()
  }, [params, registrationConfirmation])

  return (
    <>
      {isSuccess && <ConfirmEmail />}
      {error && <ResendEmail />}
    </>
  )
}

RegistrationConfirmation.getLayout = getAuthLayout

export default RegistrationConfirmation
