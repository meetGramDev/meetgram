import React from 'react'
import { useMediaQuery } from 'react-responsive'

import { translate } from '@/shared/lib/langSwitcher'
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

  function changeLanguage(e: string) {
    push({ pathname, query }, asPath, { locale: e })
  }

  const Lang = translate(locale).componentLang

  const isMobile = useMediaQuery({ query: '(max-width:650px)' })

  return (
    <div className={className}>
      <Select
        onValueChange={changeLanguage}
        placeholder={
          <div className={s.row}>
            <Lang /> {!isMobile && translate(locale).language}
          </div>
        }
      >
        {locales?.map((el, i) => {
          const Lang = translate(el).componentLang

          return (
            <Option key={i} value={el}>
              <div className={s.row}>
                <Lang />
                {!isMobile && translate(el).language}
              </div>
            </Option>
          )
        })}
      </Select>
    </div>
  )
}
