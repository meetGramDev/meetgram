import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

import { Profile, useGetProfileQuery } from '@/pages/profile/model/services/profile.service'
import { PRIVACY_POLICY } from '@/shared/config/router'
import { translate } from '@/shared/lib/langSwitcher'
import { Button, DatePicker, Input, Select, TextArea } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'
import { useRouter } from 'next/router'

import s from './UserSettings.module.scss'

import { cities, countries } from '../lib/selectValues'
import { UserSettingsFormData, useUserSettings } from '../lib/useUserSettings'

type Props = {
  data: Profile
  onSubmit: (data: UserSettingsFormData) => void
}

export const UserSettingsForm = ({ data, onSubmit }: Props) => {
  // const { data, isLoading } = useGetProfileQuery()
  const [start, setStart] = useState<Date | undefined>(new Date(0o000))
  const [text, setText] = useState('')

  const { locale } = useRouter()

  const { errorsTr, signUpLang } = translate(locale)

  const { control, errors, handleSubmit, isValid, register } = useUserSettings(
    errorsTr,
    data as Profile
  )

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

  return (
    <div>
      <DevTool control={control} />
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
              required={false}
              startDate={start}
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
            />
          </div>
          <div>
            <Select
              contentClassName={s.scrollSelect}
              label={'Select your city'}
              options={cities}
              placeholder={'City'}
              rootClassName={s.selectWidth}
            />
          </div>
        </div>
        <TextArea label={'About me'} onChange={e => changeEventHandler(e as string)} value={text} />
        <Button disabled={!isValid || !validAge(Number(start))} type={'submit'}>
          Save changes
        </Button>
      </form>
      <div className={s.button}></div>
    </div>
  )
}
