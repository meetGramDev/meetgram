import React from 'react'

import Image from 'next/image'

import s from './sidebarPng.module.scss'

import { TypePng } from '../../../../shared/assets/icons/sidbarIcon'

type TypeProps = {
  className?: string
  name?: string
  png: TypePng
  size: number
}
export const SidebarPng = ({ className, name = '', png, size }: TypeProps) => {
  return (
    <div className={className}>
      <Image alt={'some'} height={size} src={png} width={size} />
      <samp className={s.name}>{name}</samp>
    </div>
  )
}
