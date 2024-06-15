import React from 'react'

import { Option } from '@/shared/ui/select/option'
import { Select } from '@/shared/ui/select/select'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { be } from '../../../../locales/be'
import { en } from '../../../../locales/en'
import { es } from '../../../../locales/es'
import { ru } from '../../../../locales/ru'
import { uk } from '../../../../locales/uk'

type ProtoType = {
  className?: string
}

export const LangSwitcher = (props: ProtoType) => {
  const { className } = props
  const router = useRouter()
  const { asPath, locale, locales, pathname, push, query } = router

  const t = (v = locale) => {
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

  const changeLanguage = (e: string) => {
    push({ pathname, query }, asPath, { locale: e })
  }

  /*todo add className as in card and rename component and delete everything div and button */
  return (
    <div className={clsx([className])}>
      <Select onValueChange={changeLanguage} placeholder={t().language}>
        {locales?.map((el, i) => (
          <Option key={i} value={el}>
            {t(el).language}
          </Option>
        ))}
      </Select>
    </div>
  )
}
