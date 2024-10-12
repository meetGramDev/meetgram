import { ReactNode } from 'react'

import { SearchDialog } from '@/features/search'
import clsx from 'clsx'

import s from './style.module.scss'

type Props = {
  children: ReactNode
  className?: string
}

export const ContainerWithSearch = ({ children, className }: Props) => {
  return (
    <div className={clsx(className, s.container)}>
      <SearchDialog />
      <div className={s.content}>{children}</div>
    </div>
  )
}
