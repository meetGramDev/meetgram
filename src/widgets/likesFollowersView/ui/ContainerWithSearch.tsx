import { ReactNode } from 'react'

import { SearchDialog } from '@/features/search'

import s from './style.module.scss'

type Props = {
  children: ReactNode
}

export const ContainerWithSearch = ({ children }: Props) => {
  return (
    <div className={s.container}>
      <SearchDialog />
      <div className={s.content}>{children}</div>
    </div>
  )
}
