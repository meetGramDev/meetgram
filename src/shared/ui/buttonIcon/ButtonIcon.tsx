import { ButtonHTMLAttributes } from 'react'

import { clsx } from 'clsx'

import s from './buttonIcon.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonIcon = ({ children, className, ...rest }: Props) => {
  return (
    <button className={clsx(s.button, className)} type={'button'} {...rest}>
      {children}
    </button>
  )
}
