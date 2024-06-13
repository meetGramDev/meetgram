import { z } from 'zod'

export const emailConstraint = z.string().email()

export const passwordConstraint = z
  .string()
  .trim()
  .min(6, { message: 'Minimum number of characters 6' })
  .max(20, { message: 'Maximum number of characters 20' })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]{6,}$/,
    'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
  )

export const userNameConstraint = z
  .string()
  .min(6, { message: 'Minimum number of characters 6' })
  .max(30, { message: 'Maximum number of characters 30' })

export const passwordSignInConstraint = z
  .string()
  .trim()
  .min(6, { message: 'Minimum number of characters 6' })
  .max(20, { message: 'Maximum number of characters 20' })
