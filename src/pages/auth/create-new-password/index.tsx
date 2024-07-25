import { useEffect, useState } from 'react'

import { CreateNewPasswordForm } from '@/features/auth/createNewPassword'
import { CreateNewPasswordValues } from '@/features/auth/createNewPassword/lib/useCreateNewPassword'
import { useAddNewPasswordMutation } from '@/features/auth/forgotPassword/model/services/forgotPassword.service'
import { SIGN_IN } from '@/shared/config/router'
import { CONFIRMATION_CODE_LS_KEY } from '@/shared/const/consts'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const CreateNewPassword = () => {
  const [addNewPassword, {}] = useAddNewPasswordMutation()
  const [confirmationCode, setConfirmationCode] = useState('')
  const router = useRouter()

  const onSubmitHandler = async (data: CreateNewPasswordValues) => {
    try {
      await addNewPassword({
        newPassword: data.password,
        recoveryCode: confirmationCode,
      }).unwrap()
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CONFIRMATION_CODE_LS_KEY)
      }

      return router.push(SIGN_IN)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const code = localStorage.getItem(CONFIRMATION_CODE_LS_KEY)

      if (code) {
        setConfirmationCode(code)
      }
    }
  }, [])

  return <CreateNewPasswordForm onSubmit={onSubmitHandler} />
}

CreateNewPassword.getLayout = getAuthLayout

export default CreateNewPassword
