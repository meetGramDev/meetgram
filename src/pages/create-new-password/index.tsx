import { CreateNewPasswordForm } from '@/features/auth/createNewPassword'
import { useAddNewPasswordMutation } from '@/features/auth/forgotPassword/model/services/forgotPassword.service'
import { SIGN_IN } from '@/shared/config/router'
import { CONFIRMATION_CODE_LS_KEY } from '@/shared/const/consts'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const CreateNewPassword = () => {
  const [addNewPassword, {}] = useAddNewPasswordMutation()
  const confirmationCode = window.localStorage.getItem(CONFIRMATION_CODE_LS_KEY)
  const router = useRouter()

  const onSubmitHandler = async (data: { newPassword: string }) => {
    try {
      await addNewPassword({
        newPassword: data.newPassword,
        recoveryCode: String(confirmationCode),
      }).unwrap()
      window.localStorage.removeItem(CONFIRMATION_CODE_LS_KEY)

      return router.push(SIGN_IN)
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateNewPasswordForm onSubmit={onSubmitHandler} />
}

CreateNewPassword.getLayout = getAuthLayout

export default CreateNewPassword
