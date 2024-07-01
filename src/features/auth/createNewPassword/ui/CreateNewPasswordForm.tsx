import { translate } from '@/shared/lib/langSwitcher'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input/input'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

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

  const { locale } = useRouter()
  const { createNewPasswordForm, errorsTr } = translate(locale)

  const { errors, handleSubmit, register } = useCreateNewPassword(errorsTr)

  const createNewPasswordHandler = (data: CreateNewPasswordValues) => {
    alert(`password: ${data.password}, confirm password: ${data.confirmPassword}`)
    onSubmit({ newPassword: data.password as string })
  }

  return (
    <Card className={classNames.card}>
      <h1 className={classNames.title}>{createNewPasswordForm.createNewPassword}</h1>
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
        <div className={classNames.text}>{createNewPasswordForm.passwordTerm}</div>
        <Button className={classNames.button} fullWidth variant={'primary'}>
          {createNewPasswordForm.createNewPassword}
        </Button>
      </form>
    </Card>
  )
}
