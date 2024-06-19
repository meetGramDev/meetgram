'use client'

import { be } from '../../locales/be'
import { en } from '../../locales/en'
import { es } from '../../locales/es'
import { ru } from '../../locales/ru'
import { uk } from '../../locales/uk'

// eslint-disable-next-line react-hooks/rules-of-hooks

export const Tr = (v?: string | undefined) => {
  switch (v) {
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
