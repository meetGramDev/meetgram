import { z } from 'zod'

import { ErrorEmail, ErrorValidationFields } from '../../../public/locales/en'

const maxChar = 'Maximum number of characters'
const minChar = 'Minimum number of characters'
const aboutMe = 'Field About me must contain'
const wrongUsername = 'Wrong username'
const wrongFirstName = 'Wrong First Name'
const wrongLastName = 'Wrong Last Name'

export const getUserNameConstraint = (errorValidationFields: ErrorValidationFields | undefined) => {
  return z
    .string()
    .trim()
    .min(6, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 6` })
    .max(30, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 30` })
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: errorValidationFields ? errorValidationFields.wrongUsername : wrongUsername,
    })
}

export const getFirstNameConstraint = (
  errorValidationFields: ErrorValidationFields | undefined
) => {
  return z
    .string()
    .trim()
    .min(1, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 1` })
    .max(50, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 50` })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: errorValidationFields ? errorValidationFields.wrongFirstName : wrongFirstName,
    })
}
export const getLastNameConstraint = (errorValidationFields: ErrorValidationFields | undefined) => {
  return z
    .string()
    .trim()
    .min(1, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 1` })
    .max(50, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 50` })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: errorValidationFields ? errorValidationFields.wrongLastName : wrongLastName,
    })
}

export const getAboutMeConstraint = (errorValidationFields: ErrorValidationFields | undefined) => {
  return z
    .string()
    .trim()
    .min(0, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 0` })
    .max(200, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 200` })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: errorValidationFields ? errorValidationFields.aboutMe : aboutMe,
    })
}
