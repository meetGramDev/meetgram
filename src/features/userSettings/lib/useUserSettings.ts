import { useForm } from 'react-hook-form'

import { Profile } from '@/pages/profile/model/services/profile.service'
import {
  getAboutMeConstraint,
  getFirstNameConstraint,
  getLastNameConstraint,
} from '@/shared/const/userSettingsFields'
import { getUserNameConstraint } from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ErrorsTr } from '../../../../public/locales/en'

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
    handleSubmit,
    register,
  } = useForm<UserSettingsFormData>({
    defaultValues: {
      aboutMe: data.aboutMe ?? '',
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
    handleSubmit,
    isValid,
    register,
  }
}
