import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  Ref,
  forwardRef,
} from 'react'

import { PolymorphicRef } from '@/shared/types'
import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonVariant = 'link' | 'outlined' | 'primary' | 'secondary' | 'text'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
  disabled?: boolean
  fullWidth?: boolean
  variant?: ButtonVariant
} & ComponentPropsWithoutRef<T>

const ButtonComponent = <T extends ElementType = 'button'>(
  props: ButtonProps<T>,
  ref?: Ref<PolymorphicRef<T>>
) => {
  const { as, className, disabled = false, fullWidth, variant = 'primary', ...rest } = props

  const classNames = { root: clsx(fullWidth && s.fullWidth, s[variant], className) }

  const Component = as || 'button'

  return <Component className={classNames.root} disabled={disabled} ref={ref} {...rest} />
}

export const Button = forwardRef(ButtonComponent) as <T extends ElementType = 'button'>(
  props: { ref?: ForwardedRef<ElementRef<T>> } & ButtonProps<T>
) => ReturnType<typeof ButtonComponent>
