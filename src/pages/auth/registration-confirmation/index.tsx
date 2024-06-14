import { useEffect } from 'react'

import { useRegistrationConfirmationMutation } from '@/features/auth/registrationConfirmation/model/services/registration.service'
import { SIGN_IN } from '@/shared/config/router'
import { NextPageWithLayout } from '@/shared/types'
import { getAuthLayout } from '@/widgets/layouts'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const RegistrationConfirmation: NextPageWithLayout = () => {
  const [registrationConfirmation] = useRegistrationConfirmationMutation()
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const confirmationCode = params?.get('code')

    if (confirmationCode) {
      registrationConfirmation({ confirmationCode }).then(res => {
        return router.push(SIGN_IN)
      })
    }
  }, [params, registrationConfirmation])

  return (
    <div>
      <h2>Registration confirmation</h2>
      {params?.get('code')}
    </div>
  )
}

RegistrationConfirmation.getLayout = getAuthLayout

export default RegistrationConfirmation
