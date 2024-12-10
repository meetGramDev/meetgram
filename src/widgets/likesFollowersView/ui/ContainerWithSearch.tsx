import { ReactNode } from 'react'

import { SearchDialog } from '@/features/search'
import clsx from 'clsx'

import s from './style.module.scss'

type Props = {
  children: ReactNode
  className?: string
}
//TODO change search dialog  component props
export const ContainerWithSearch = ({ children, className }: Props) => {
  return (
    <div className={clsx(className, s.container)}>
      <SearchDialog onValueQuery={() => {}} />
      <div className={s.content}>{children}</div>
    </div>
  )
}
