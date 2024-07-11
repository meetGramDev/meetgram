import React, { useState } from 'react'

import { UserSettingsFormData, useUserSettings } from '@/features/userSettings/lib/useUserSettings'
import { ServerMessagesType } from '@/shared/api'
import { translate } from '@/shared/lib/langSwitcher'
import { Button, DatePicker, Input, Select, TextArea } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from '@/features/auth/signUp/ui/signUpForm.module.scss'

type Props = {
  error?: ServerMessagesType[]
  onSubmit: (data: UserSettingsFormData) => void
}

export const UserSettingsForm = ({ error, onSubmit }: Props) => {
  const [start, setStart] = useState<Date | undefined>(new Date())
  const { locale } = useRouter()

  const { errorsTr, signUpLang } = translate(locale)

  const {
    clearErrors,
    control,
    errors,
    getValues,
    handleSubmit,
    isDirty,
    isValid,
    register,
    setError,
  } = useUserSettings(errorsTr)

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit(() => {})}>
        <div>
          <Input
            error={errors.userName?.message}
            label={signUpLang.username}
            star
            {...register('userName')}
          />
          <Input
            error={errors.firstName?.message}
            label={'First Name'}
            star
            type={'firstName'}
            {...register('firstName')}
          />
          <Input
            error={errors.lastName?.message}
            label={'Last Name'}
            star
            type={'lastName'}
            {...register('lastName')}
          />
          <DatePicker onStartDateChange={setStart} startDate={start} />
        </div>
        <div>
          <Select label={'Select your country'} placeholder={'Country'} />
          <Select label={'Select your city'} placeholder={'City'} />
        </div>
        <TextArea label={'About me'} onChange={() => {}} value={'Text-area'} />
      </form>
      <Button disabled={!isDirty || !isValid} type={'submit'}>
        Save changes
      </Button>
    </div>
  )
}
