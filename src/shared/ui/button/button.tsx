import { ComponentPropsWithoutRef } from 'react'

import s from './button.module.scss'

type ButtonProps = {
  className?: string
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<'button'>

export const Button = (props: ButtonProps) => {
  const { className, fullWidth, variant = 'primary', ...rest } = props

  return (
    <button className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest} />
  )
}
