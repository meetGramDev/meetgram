import { useEffect } from 'react'

import { CreateNewPassword } from '@/features/auth/createNewPassword'
import {
  useAddNewPasswordMutation,
  useCheckRecoveryCodeMutation,
} from '@/features/auth/forgotPassword/model/services/forgotPassword.service'
import { getAuthLayout } from '@/widgets/layouts'
import { redirect, useSearchParams } from 'next/navigation'

const Recovery = () => {
  const params = useSearchParams()
  const [checkRecoveryCode, { error, isLoading }] = useCheckRecoveryCodeMutation()
  const [addNewPassword, {}] = useAddNewPasswordMutation()

  const confirmationCode = params?.get('code')

  console.log(confirmationCode)

  useEffect(() => {
    checkRecoveryCode({ recoveryCode: confirmationCode as string })
      .unwrap()
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const onSubmitHandler = async (data: { newPassword: string }) => {
    try {
      await addNewPassword({
        newPassword: data.newPassword,
        recoveryCode: confirmationCode as string,
      }).unwrap()
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateNewPassword onSubmit={onSubmitHandler} />
}

Recovery.getLayout = getAuthLayout

export default Recovery
