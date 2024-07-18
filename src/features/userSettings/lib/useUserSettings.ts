import { useForm } from 'react-hook-form'

import {
  ageConstraint,
  getAboutMeConstraint,
  getFirstNameConstraint,
  getLastNameConstraint,
  placesConstraint,
} from '@/shared/const/userSettingsFields'
import { getUserNameConstraint } from '@/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ErrorsTr } from '../../../../public/locales/en'

const getUserSettingsSchema = (errorTr: ErrorsTr | undefined = undefined) => {
  const errorValidationFields = errorTr?.errorValidationFields

  return z.object({
    aboutMe: getAboutMeConstraint(errorValidationFields),
    age: ageConstraint(),
    city: placesConstraint(),
    country: placesConstraint(),
    firstName: getFirstNameConstraint(errorValidationFields),
    lastName: getLastNameConstraint(errorValidationFields),
    userName: getUserNameConstraint(errorValidationFields),
  })
}

const userSettingsSchema = getUserSettingsSchema()

export type UserSettingsFormData = z.infer<typeof userSettingsSchema>

export const useUserSettings = (errorsTr: ErrorsTr) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<UserSettingsFormData>({
    defaultValues: {
      aboutMe: '',
      age: new Date(),
      city: '',
      country: '',
      firstName: '',
      lastName: '',
      userName: '',
    },

    mode: 'onBlur',
    resolver: zodResolver(getUserSettingsSchema(errorsTr)),
  })

  return {
    errors,
    handleSubmit,
    isValid,
    register,
  }
}
