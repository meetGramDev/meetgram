import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Profile } from '@/entities/user'
import { ServerMessagesType } from '@/shared/api'
import { PRIVACY_POLICY } from '@/shared/config/router'
import { cities } from '@/shared/const/citiesData'
import { countries } from '@/shared/const/countriesData'
import { translate } from '@/shared/lib/langSwitcher'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button, DatePicker, Input, Select, TextArea } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './UserSettings.module.scss'

import { UserSettingsFormData, useUserSettings } from '../lib/useUserSettings'
import { validAge } from '../lib/validAge'

type Props = {
  data: Profile
  error?: ServerMessagesType[]
  onSubmit: (data: UserSettingsFormData) => void
}

export const UserSettingsForm = ({ data, error, onSubmit }: Props) => {
  const [start, setStart] = useState<Date | undefined>()

  const { locale } = useRouter()

  const { errorsTr, policies, signUpLang } = translate(locale)

  const t = useTranslate()
  const { control, errors, getValues, handleSubmit, isDirty, isValid, register, setError } =
    useUserSettings(errorsTr, data)

  const isDisabled = !isValid || !isDirty || (start && !validAge(Number(start)))

  useEffect(() => {
    type fieldKeys = keyof UserSettingsFormData

    //Todo maybe make function
    if (error) {
      for (const e of error) {
        for (const field in getValues()) {
          if (e.field === field) {
            setError(e.field as fieldKeys, { message: e.message })
          }
        }
      }
    }
  }, [error, setError, getValues])

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
          label={t('First Name')}
          required
          type={'firstName'}
          {...register('firstName', {
            required: true,
          })}
        />
        <Input
          error={errors.lastName?.message}
          label={t('Last Name')}
          required
          type={'lastName'}
          {...register('lastName', {
            required: true,
          })}
        />
        <div>
          <Controller
            control={control}
            name={'dateOfBirth'}
            render={({ field: { onChange, value, ...field } }) => {
              const onChangeDate = (e: Date | undefined) => {
                onChange(e)
                setStart(e)
              }

              return (
                <DatePicker
                  // @ts-ignore // TODO
                  error={errors.dateOfBirth?.message}
                  inputClassName={start && !validAge(Number(start))}
                  label={t('Date of birth')}
                  onStartDateChange={onChangeDate}
                  startDate={value}
                  {...field}
                />
              )
            }}
          />
          {start && !validAge(Number(start)) && (
            <span className={s.errorMessage}>
              {errorsTr.errorValidationFields.wrongDateOfBirth}
              &nbsp;
              <a className={s.errorLink} href={PRIVACY_POLICY} rel={'noreferrer'} target={'_blank'}>
                {policies['Privacy Policy']}
              </a>
            </span>
          )}
        </div>
      </div>
      <div className={s.locationSelects}>
        <div className={s.selectWrapper}>
          <Controller
            control={control}
            name={'country'}
            render={({ field: { onChange, value, ...field } }) => (
              <Select
                contentClassName={s.scrollSelect}
                label={t('Select your country')}
                onValueChange={onChange}
                options={countries}
                placeholder={t('Country')}
                rootClassName={s.selectWidth}
                value={value}
                {...field}
              />
            )}
          />
        </div>
        <div className={s.selectWrapper}>
          <Controller
            control={control}
            name={'city'}
            render={({ field: { onChange, value, ...field } }) => (
              <Select
                contentClassName={s.scrollSelect}
                label={t('Select your city')}
                onValueChange={onChange}
                options={cities}
                placeholder={t('City')}
                rootClassName={s.selectWidth}
                value={value}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <TextArea
        error={errors.aboutMe?.message}
        label={t('About me')}
        placeholder={t('text area')}
        {...register('aboutMe')}
      />
      <hr className={s.hr}></hr>
      <Button className={s.button} disabled={isDisabled} type={'submit'}>
        {t('Save changes')}
      </Button>
    </form>
  )
}
