import React from 'react'
import { useMediaQuery } from 'react-responsive'

import { ByFlagIcon } from '@/shared/assets/icons/BY'
import { EsFlagIcon } from '@/shared/assets/icons/ES'
import { RuFlagIcon } from '@/shared/assets/icons/RU'
import { UaFlagIcon } from '@/shared/assets/icons/UA'
import { UsFlagIcon } from '@/shared/assets/icons/US'
import { Option } from '@/shared/ui/select/option'
import { Select } from '@/shared/ui/select/select'
import { useRouter } from 'next/router'

import s from './langSwitcher.module.scss'

type Props = {
  className?: string
}

export const LangSwitcher = ({ className }: Props) => {
  const router = useRouter()
  const { asPath, locale, locales, pathname, push, query } = router

  type TypeLanguage = {
    be: {}
    en: {}
    es: {}
    ru: {}
    uk: {}
  }
  const languages: TypeLanguage = {
    be: { componentLang: ByFlagIcon, language: 'Belarus' },
    en: { componentLang: UsFlagIcon, language: 'English' },
    es: { componentLang: EsFlagIcon, language: 'Spanish' },
    ru: { componentLang: RuFlagIcon, language: 'Russia' },
    uk: { componentLang: UaFlagIcon, language: 'Ukraine' },
  }

  function changeLanguage(e: string) {
    push({ pathname, query }, asPath, { locale: e })
  }

  const loc = locale || 'el'

  // @ts-ignore
  const Lang = languages[locale].componentLang

  const isMobile = useMediaQuery({ query: '(max-width:650px)' })

  return (
    <div className={className}>
      <Select
        onValueChange={changeLanguage}
        placeholder={
          <div className={s.row}>
            <Lang />
          </div>
        }
      >
        {locales?.map((el, i) => {
          // @ts-ignore
          const Lang = languages[el].componentLang

          return (
            <Option key={i} value={el}>
              <div className={s.row}>
                <Lang />
              </div>
            </Option>
          )
        })}
      </Select>
    </div>
  )
}
