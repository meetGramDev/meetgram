import { z } from 'zod'

import { ErrorValidationFields } from '../../../public/locales/en'

const maxChar = 'Maximum number of characters'
const minChar = 'Minimum number of characters'
const wrongFirstName = 'Wrong First Name'
const wrongLastName = 'Wrong Last Name'
const wrongDateOfBirth = 'dd.mm.xxxx - date format'

export const getFirstNameConstraint = (
  errorValidationFields: ErrorValidationFields | undefined
) => {
  return z
    .string()
    .trim()
    .min(1, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 1` })
    .max(50, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 50` })
    .regex(/^[a-zA-Zа-яА-Я]*$/, {
      message: errorValidationFields ? errorValidationFields.wrongFirstName : wrongFirstName,
    })
}
export const getLastNameConstraint = (errorValidationFields: ErrorValidationFields | undefined) => {
  return z
    .string()
    .trim()
    .min(1, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 1` })
    .max(50, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 50` })
    .regex(/^[a-zA-Zа-яА-Я]*$/, {
      message: errorValidationFields ? errorValidationFields.wrongLastName : wrongLastName,
    })
}

export const getAboutMeConstraint = (errorValidationFields: ErrorValidationFields | undefined) => {
  return z
    .string()
    .trim()
    .min(0, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 0` })
    .max(200, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 200` })
}

export const getDateOfBirthConstraint = (
  errorValidationFields: ErrorValidationFields | undefined
) => {
  return z
    .string()
    .trim()
    .regex(/^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.(\d{4})$/, {
      message: errorValidationFields ? errorValidationFields.wrongDateOfBirth : wrongDateOfBirth,
    })
}
