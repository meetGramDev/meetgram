import React, { ReactNode } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

// eslint-disable-next-line import/no-unresolved

type ProtoType = {
  children: ReactNode
  className?: string
}
export default function Card(props: ProtoType) {
  const { children, className } = props

  return <div className={clsx(clsx(s.main), [className])}>{children}</div>
}
