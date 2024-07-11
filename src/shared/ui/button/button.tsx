import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardRefExoticComponent,
  ReactNode,
  forwardRef,
} from 'react'

import { PolymorphicComponentPropsWithRef, PolymorphicRef } from '@/shared/types'
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

type ButtonComponent<T extends ElementType = 'button'> = ForwardRefExoticComponent<
  PolymorphicComponentPropsWithRef<T, ButtonProps<T>>
>

export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, forwardRef?: PolymorphicRef<T>) => {
    const { as, className, disabled = false, fullWidth, variant = 'primary', ...rest } = props

    const classNames = { root: clsx(fullWidth && s.fullWidth, s[variant], className) }

    const Component = as || 'button'

    return (
      <Component className={classNames.root} disabled={disabled} ref={forwardRef} {...rest}>
        {props.children}
      </Component>
    )
  }
)
