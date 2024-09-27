import { ButtonHTMLAttributes, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './buttonIcon.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonIcon = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button className={clsx(s.button, className)} ref={ref} type={'button'} {...rest}>
        {children}
      </button>
    )
  }
)
