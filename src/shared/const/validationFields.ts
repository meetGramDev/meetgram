import { z } from 'zod'

import { ErrorEmail, ErrorValidationFields } from '../../../public/locales/en'

const maxChar = 'Maximum number of characters'
const minChar = 'Minimum number of characters'
const passContain = 'Password must contain'
const wrongUsername = 'Wrong username'
const errorEmail = 'Invalid email'

export const getEmailConstraint = (errorEmail?: ErrorEmail) => {
  return z.string().email({ message: errorEmail ? errorEmail.InvalidEmail : errorEmail })
}

export const getPasswordConstraint = (errorValidationFields?: ErrorValidationFields) => {
  return z
    .string()
    .trim()
    .min(6, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 6` })
    .max(20, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 20` })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]{6,}$/,
      errorValidationFields
        ? errorValidationFields.passContain
        : passContain +
            ' a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
    )
}

export const getUserNameConstraint = (errorValidationFields?: ErrorValidationFields) => {
  return z
    .string()
    .trim()
    .min(6, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 6` })
    .max(30, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 30` })
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: errorValidationFields ? errorValidationFields.wrongUsername : wrongUsername,
    })
}

export const getPasswordSignInConstraint = (errorValidationFields?: ErrorValidationFields) => {
  return z
    .string()
    .trim()
    .min(6, { message: `${errorValidationFields ? errorValidationFields.minChar : minChar} 6` })
    .max(20, { message: `${errorValidationFields ? errorValidationFields.maxChar : maxChar} 20` })
}
