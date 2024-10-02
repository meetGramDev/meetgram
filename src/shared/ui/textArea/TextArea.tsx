import { ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import { clsx } from 'clsx'

import s from './TextArea.module.scss'

type TextAreaProps = {
  cols?: number
  error?: string
  label?: boolean | string
  labelClassName?: string
  name?: string
  rows?: number
  value?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ disabled, error, label, labelClassName, rows = 3, value, ...rest }, ref) => {
    const id = useId()

    const classNames = {
      errorMessage: clsx(s.label, error && s.error),
      label: clsx(s.label, disabled && s.disabled, labelClassName),
      textArea: clsx(s.textArea, error && s.error, disabled && s.disabled),
      textAreaWrapper: s.textAreaWrapper,
      wrapperComponent: clsx(s.wrapper),
    }

    return (
      <div className={classNames.wrapperComponent}>
        <label className={classNames.label} htmlFor={id}>
          {label}
        </label>

        <div className={classNames.textAreaWrapper}>
          <textarea
            className={classNames.textArea}
            disabled={disabled}
            id={id}
            ref={ref}
            rows={rows}
            value={value}
            {...rest}
          />
          {!!error && <span className={classNames.errorMessage}>{error}</span>}
        </div>
      </div>
    )
  }
)
