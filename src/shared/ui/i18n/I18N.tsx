import React from 'react'

import { Button } from '@/shared/ui/button/button'
import { Option } from '@/shared/ui/select/option'
import { Select } from '@/shared/ui/select/select'
import { useRouter } from 'next/router'

import s from './i18n.module.scss'

import { be } from '../../../../locales/be'
import { en } from '../../../../locales/en'
import { es } from '../../../../locales/es'
import { ru } from '../../../../locales/ru'
import { uk } from '../../../../locales/uk'

export const I18N = () => {
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

  return (
    <div className={s.main}>
      <Button variant={'primary'}>{t().button.Button}</Button>

      <Button variant={'outlined'}>{t().button.Link}</Button>

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
