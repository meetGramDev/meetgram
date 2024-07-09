import React from 'react'

import { translate } from '@/shared/lib/langSwitcher'
import { Option } from '@/shared/ui/select/option'
import { Select } from '@/shared/ui/select/select'
import { useRouter } from 'next/router'

type Props = {
  className?: string
}

export const LangSwitcher = ({ className }: Props) => {
  const router = useRouter()
  const { asPath, locale, locales, pathname, push, query } = router

  function changeLanguage(e: string) {
    push({ pathname, query }, asPath, { locale: e })
  }

  return (
    <div className={className}>
      <Select onValueChange={changeLanguage} placeholder={translate(locale).language}>
        {locales?.map((el, i) => (
          <Option key={i} value={el}>
            {translate(el).language}
          </Option>
        ))}
      </Select>
    </div>
  )
}
