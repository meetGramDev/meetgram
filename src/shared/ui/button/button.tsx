import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'outlined' | 'primary' | 'secondary' | 'text'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { as, className, fullWidth, variant = 'primary', ...rest } = props

  const classNames = { root: clsx(fullWidth && s.fullWidth, s[variant], className) }

  const Component = as || 'button'

  return <Component className={classNames.root} {...rest} />
}
