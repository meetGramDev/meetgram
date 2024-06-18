import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonVariant = 'link' | 'outlined' | 'primary' | 'secondary' | 'text'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  disabled?: boolean
  fullWidth?: boolean
  variant?: ButtonVariant
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { as, className, disabled = false, fullWidth, variant = 'primary', ...rest } = props

  const classNames = { root: clsx(fullWidth && s.fullWidth, s[variant], className) }

  const Component = as || 'button'

  return (
    <Component className={classNames.root} disabled={disabled} {...rest}>
      {props.children}
    </Component>
  )
}
