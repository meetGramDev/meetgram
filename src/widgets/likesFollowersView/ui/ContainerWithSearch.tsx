import { ReactNode } from 'react'

import { SearchDialog } from '@/features/search'
import clsx from 'clsx'

import s from './style.module.scss'

type Props = {
  children: ReactNode
  className?: string
  setSearchStr: (value: string) => void
}
//TODO change users dialog  component props
export const ContainerWithSearch = ({ children, className, setSearchStr }: Props) => {
  return (
    <div className={clsx(className, s.container)}>
      <SearchDialog onValueQuery={setSearchStr} />
      <div className={s.content}>{children}</div>
    </div>
  )
}
