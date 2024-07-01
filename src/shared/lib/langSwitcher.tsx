'use client'

import { be } from '../../../public/locales/be'
import { en } from '../../../public/locales/en'
import { es } from '../../../public/locales/es'
import { ru } from '../../../public/locales/ru'
import { uk } from '../../../public/locales/uk'

export const translate = (language?: string) => {
  switch (language) {
    case 'be':
      return be
    case 'es':
      return es
    case 'ru':
      return ru
    case 'uk':
      return uk
    default:
      return en
  }
}
