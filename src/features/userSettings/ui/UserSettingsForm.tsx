import React, { useState } from 'react'

import { PRIVACY_POLICY } from '@/shared/config/router'
import { translate } from '@/shared/lib/langSwitcher'
import { Button, DatePicker, Input, Select, TextArea } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './UserSettings.module.scss'

import { cities, countries } from '../lib/selectValues'
// eslint-disable-next-line import/namespace
import { UserSettingsFormData, useUserSettings } from '../lib/useUserSettings'

type Props = {
  onSubmit: (data: UserSettingsFormData) => void
}

export const UserSettingsForm = ({ onSubmit }: Props) => {
  const [start, setStart] = useState<Date | undefined>(new Date(0o000))
  const [text, setText] = useState('')

  const { locale } = useRouter()

  const { errorsTr, signUpLang } = translate(locale)

  const { errors, handleSubmit, isValid, register } = useUserSettings(errorsTr)

  const changeEventHandler = (message: string) => {
    setText(message)
  }

  const validAge = (date: Date | number): boolean => {
    const timeMs = typeof date === 'number' ? date : date.getTime()
    const dateToCompare = new Date(timeMs)

    const currentDate = new Date()
    const pastDate = new Date(
      currentDate.getFullYear() - 13,
      currentDate.getMonth(),
      currentDate.getDate()
    )

    return dateToCompare < pastDate
  }

  const isDisabled = !isValid || !validAge(Number(start))

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.fields}>
        <Input
          error={errors.userName?.message}
          label={signUpLang.username}
          required
          {...register('userName', {
            required: true,
          })}
        />
        <Input
          error={errors.firstName?.message}
          label={'First Name'}
          required
          type={'firstName'}
          {...register('firstName', {
            required: true,
          })}
        />
        <Input
          error={errors.lastName?.message}
          label={'Last Name'}
          required
          type={'lastName'}
          {...register('lastName', {
            required: true,
          })}
        />
        <div>
          <DatePicker
            inputClassName={!validAge(Number(start))}
            label={'Date of birth'}
            onStartDateChange={setStart}
            startDate={start}
            {...register('age', { required: false })}
          />
          {!validAge(Number(start)) && (
            <span className={s.errorMessage}>
              {errorsTr.errorValidationFields.wrongDateOfBirth}
              <a className={s.errorLink} href={PRIVACY_POLICY}>
                {signUpLang.privPolicy}
              </a>
            </span>
          )}
        </div>
      </div>
      <div className={s.select}>
        <div>
          <Select
            contentClassName={s.scrollSelect}
            label={'Select your country'}
            options={countries}
            placeholder={'Country'}
            rootClassName={s.selectWidth}
            {...register('country', { required: false })}
          />
        </div>
        <div>
          <Select
            contentClassName={s.scrollSelect}
            label={'Select your city'}
            options={cities}
            placeholder={'City'}
            rootClassName={s.selectWidth}
            {...register('city', { required: false })}
          />
        </div>
      </div>
      <TextArea
        error={errors.aboutMe?.message}
        label={'About me'}
        placeholder={'Text-area'}
        required={false}
        {...register('aboutMe', {
          onChange: e => changeEventHandler(e as string),
          required: false,
        })}
      />
      <hr className={s.hr}></hr>
      <Button className={s.button} disabled={isDisabled} type={'submit'}>
        Save changes
      </Button>
    </form>
  )
}
