import React from 'react'

import { Tr } from '@/hooks/useLangSwitcher'
import { Option } from '@/shared/ui/select/option'
import { Select } from '@/shared/ui/select/select'
import clsx from 'clsx'
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

  /*todo add className as in card and rename component and delete everything div and button */
  return (
    <div className={clsx([className])}>
      <Select onValueChange={changeLanguage} placeholder={Tr(locale).language}>
        {locales?.map((el, i) => (
          <Option key={i} value={el}>
            {Tr(el).language}
          </Option>
        ))}
      </Select>
    </div>
  )
}
