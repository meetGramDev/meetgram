import { CreateNewPasswordForm } from '@/features/auth/createNewPassword'
import { useAddNewPasswordMutation } from '@/features/auth/forgotPassword/model/services/forgotPassword.service'
import { getAuthLayout } from '@/widgets/layouts'
import { useRouter } from 'next/router'

const CreateNewPassword = () => {
  const [addNewPassword, {}] = useAddNewPasswordMutation()
  const confirmationCode = localStorage.getItem('confirmationCode')
  const router = useRouter()

  const onSubmitHandler = async (data: { newPassword: string }) => {
    try {
      await addNewPassword({
        newPassword: data.newPassword,
        recoveryCode: confirmationCode as string,
      }).unwrap()
      localStorage.clear()
      router.push('/sign-in')
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateNewPasswordForm onSubmit={onSubmitHandler} />
}

CreateNewPassword.getLayout = getAuthLayout

export default CreateNewPassword
