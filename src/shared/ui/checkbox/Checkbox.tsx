import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './Checkbox.module.scss'

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

export const Checkbox = (props: CheckboxProps) => {
  const { checked, className, disabled, id, label, onValueChange, position, required, ...rest } =
    props

  const classNames = {
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    container: clsx(s.innerContainer, className),
    indicator: clsx(s.indicator, checked && s.checked, disabled && s.disabled),
    label: clsx(s.label, disabled && s.disabled),
    root: clsx(s.root),
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
              {!disabled ? <Check /> : <Check fill={`var(--dark-color-100)`} />}
            </CheckboxRadix.Indicator>
          )}
        </CheckboxRadix.Root>
      </div>
      <label className={classNames.label} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
