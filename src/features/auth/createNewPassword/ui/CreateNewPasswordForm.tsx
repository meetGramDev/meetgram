import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'

import s from './CreateNewPassword.module.scss'

import { CreateNewPasswordValues, useCreateNewPassword } from '../lib/useCreateNewPassword'

type PropsType = {
  onSubmit: (data: { newPassword: string }) => void
}

export const CreateNewPasswordForm = ({ onSubmit }: PropsType) => {
  const classNames = {
    button: s.button,
    card: s.card,
    passwordConfirmation: clsx(s.input, s.passwordConfirmation),
    passwordInput: clsx(s.input, s.passwordInput),
    text: s.text,
    title: s.title,
  }

  const { errors, handleSubmit, register } = useCreateNewPassword()

  const createNewPasswordHandler = (data: CreateNewPasswordValues) => {
    alert(`password: ${data.password}, confirm password: ${data.confirmPassword}`)
    onSubmit({ newPassword: data.password as string })
  }

  return (
    <Card className={classNames.card}>
      <h1 className={classNames.title}>Create New Password</h1>
      <form onSubmit={handleSubmit(createNewPasswordHandler)}>
        <Input
          className={classNames.passwordInput}
          label={'New password'}
          type={'password'}
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          className={classNames.passwordConfirmation}
          error={errors.confirmPassword?.message}
          label={'Password confirmation'}
          type={'password'}
          {...register('confirmPassword')}
        />
        <div className={classNames.text}>Your password must be between 6 and 20 characters</div>
        <Button className={classNames.button} fullWidth variant={'primary'}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
