import { useForm } from 'react-hook-form'

import {
  getAboutMeConstraint,
  getFirstNameConstraint,
  getLastNameConstraint,
} from '@/shared/const/userSettingsFields'
import { getUserNameConstraint } from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ErrorsTr } from '../../../../public/locales/en'
import { Profile } from '../model/types/profileService'

const getUserSettingsSchema = (errorTr: ErrorsTr | undefined = undefined) => {
  const errorValidationFields = errorTr?.errorValidationFields

  return z.object({
    aboutMe: getAboutMeConstraint(errorValidationFields),
    city: z.string(),
    country: z.string(),
    dateOfBirth: z.string(),
    firstName: getFirstNameConstraint(errorValidationFields),
    lastName: getLastNameConstraint(errorValidationFields),
    userName: getUserNameConstraint(errorValidationFields),
  })
}

const userSettingsSchema = getUserSettingsSchema()

export type UserSettingsFormData = z.infer<typeof userSettingsSchema>

export const useUserSettings = (errorsTr: ErrorsTr, data: Profile) => {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    setError,
  } = useForm<UserSettingsFormData>({
    defaultValues: {
      aboutMe: data.aboutMe ?? '',
      city: data.city ?? '',
      country: data.country ?? '',
      dateOfBirth: data.dateOfBirth ?? '',
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      userName: data.userName ?? '',
    },
    mode: 'onBlur',
    resolver: zodResolver(getUserSettingsSchema(errorsTr)),
  })

  return {
    control,
    errors,
    getValues,
    handleSubmit,
    isValid,
    register,
    setError,
  }
}
