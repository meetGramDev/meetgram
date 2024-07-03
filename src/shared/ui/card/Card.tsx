import { ReactNode } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type ProtoType = {
  children: ReactNode
  className?: string
}
export const Card = ({ children, className }: ProtoType) => {
  return <div className={clsx(clsx(s.main), [className])}>{children}</div>
}
