import { LocalesType, TranslationPhraseType } from '@/shared/config/i18n'
import { flattenTranslations } from '@/shared/config/i18n/hooks/flattenTranslations'
import { useRouter } from 'next/router'

import { be } from '../../../public/locales/be'
import { en } from '../../../public/locales/en'
import { es } from '../../../public/locales/es'
import { ru } from '../../../public/locales/ru'
import { uk } from '../../../public/locales/uk'

export const useTranslate = () => {
  const { locale } = useRouter()

  const lang = switcher(locale as LocalesType)

  const flattenTranslationTree = flattenTranslations(lang)

  return function (phrase: TranslationPhraseType<typeof lang>) {
    return flattenTranslationTree[phrase] ?? phrase
  }
}

function switcher<T extends LocalesType>(language: T) {
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

export type TranslateFuncType = ReturnType<typeof useTranslate>
