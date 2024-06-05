import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonVariant = 'outlined' | 'primary' | 'secondary' | 'text'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: ButtonVariant
} & ComponentPropsWithoutRef<T>

const Button = forwardRef(<T extends ElementType = 'button'>(props: ButtonProps<T>, ref: any) => {
  const { as, className, fullWidth, variant = 'primary', ...rest } = props

  const classNames = { root: clsx(fullWidth && s.fullWidth, s[variant], className) }

  const Component = as || 'button'

  return (
    <Component className={classNames.root} ref={ref} {...rest}>
      {props.children}
    </Component>
  )
})

export default Button
