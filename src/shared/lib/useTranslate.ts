'use client'
import { useRouter } from 'next/router'

import { be } from '../../../public/locales/be'
import { LenType, en } from '../../../public/locales/en'
import { es } from '../../../public/locales/es'
import { ru } from '../../../public/locales/ru'
import { uk } from '../../../public/locales/uk'

export const useTranslate = () => {
  const { locale } = useRouter()
  const language = locale || 'en'
  const lang: LenType = switcher(language)

  function t(phrase: keyof LenType) {
    return lang[phrase] || phrase
  }

  return t
}

function switcher(language: string): LenType {
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