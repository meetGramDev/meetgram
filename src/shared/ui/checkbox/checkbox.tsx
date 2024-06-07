import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

import Check from './Check'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onValueChange?: (checked: boolean) => void
  position?: 'left'
  required?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
  //поправить типизацию
  checked,
  className,
  disabled,
  id,
  label,
  onValueChange,
  position,
  required,
}) => {
  const classNames = {
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    container: clsx(s.innerContainer, className),
    indicator: clsx(s.indicator, checked && s.checked, disabled && s.disabled),
    label: clsx(s.label, disabled && s.disabled),
    root: s.root,
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.buttonWrapper}>
        <CheckboxRadix.Root
          checked={checked}
          className={classNames.root}
          disabled={disabled}
          id={id}
          onCheckedChange={onValueChange}
          required={required}
        >
          {checked && (
            <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
              <Check />
            </CheckboxRadix.Indicator>
          )}
        </CheckboxRadix.Root>
      </div>
      <div className={classNames.label}>{label}</div>
    </div>
  )
}
