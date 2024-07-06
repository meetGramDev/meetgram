import { translate } from '@/shared/lib/langSwitcher'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import { useRouter } from 'next/router'

import s from './CreateNewPassword.module.scss'

import { CreateNewPasswordValues, useCreateNewPassword } from '../lib/useCreateNewPassword'

type PropsType = {
  onSubmit: (data: CreateNewPasswordValues) => void
}

export const CreateNewPasswordForm = ({ onSubmit }: PropsType) => {
  const { locale } = useRouter()

  const { createNewPasswordForm, errorsTr } = translate(locale)

  const { errors, handleSubmit, register } = useCreateNewPassword(errorsTr)

  return (
    <Card className={s.card}>
      <h1 className={s.title}>{createNewPasswordForm.createNewPassword}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={s.passwordInput}
          label={createNewPasswordForm.newPassword}
          type={'password'}
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          className={s.passwordConfirmation}
          error={errors.confirmPassword?.message}
          label={createNewPasswordForm.passwordConfirmation}
          type={'password'}
          {...register('confirmPassword')}
        />
        <div className={s.text}>Your password must be between 6 and 20 characters</div>
        <Button className={s.button} fullWidth variant={'primary'}>
          {createNewPasswordForm.createNewPassword}
        </Button>
      </form>
    </Card>
  )
}
