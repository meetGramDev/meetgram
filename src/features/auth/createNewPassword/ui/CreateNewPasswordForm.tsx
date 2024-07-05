import { translate } from '@/shared/lib/langSwitcher'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './CreateNewPassword.module.scss'

import { CreateNewPasswordValues, useCreateNewPassword } from '../lib/useCreateNewPassword'

export type NewPasswordType = {
  newPassword: string
}
type PropsType = {
  onSubmit: (data: NewPasswordType) => void
}

export const CreateNewPasswordForm = ({ onSubmit }: PropsType) => {
  const classNames = {
    passwordConfirmation: clsx(s.input, s.passwordConfirmation),
    passwordInput: clsx(s.input, s.passwordInput),
  }

  const { locale } = useRouter()

  const { createNewPasswordForm, errorsTr } = translate(locale)

  const { errors, handleSubmit, register } = useCreateNewPassword(errorsTr)

  const createNewPasswordHandler = (data: CreateNewPasswordValues) => {
    onSubmit({ newPassword: data.password })
  }

  return (
    <Card className={s.card}>
      <h1 className={s.title}>{createNewPasswordForm.createNewPassword}</h1>
      <form onSubmit={handleSubmit(createNewPasswordHandler)}>
        <Input
          className={classNames.passwordInput}
          label={createNewPasswordForm.newPassword}
          type={'password'}
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          className={classNames.passwordConfirmation}
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
