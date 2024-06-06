import React, { ReactNode } from 'react'

import clsx from 'clsx'

// eslint-disable-next-line import/no-unresolved
import S from './card.module.scss'

type ProtoType = {
  children: ReactNode
  className?: string
}
export default function Card(props: ProtoType) {
  const { children, className } = props

  return <div className={clsx(S.main, [className])}>{children}</div>
}
