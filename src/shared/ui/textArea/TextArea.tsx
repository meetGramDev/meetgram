import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import { clsx } from 'clsx'

import s from './TextArea.module.scss'

type TextAreaProps = {
  cols?: number
  error?: string
  label: string
  name?: string
  onChange: (value: string) => void
  rows?: number
  value: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ disabled, error, label, onChange, rows = 3, value, ...rest }, ref) => {
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.currentTarget.value)
    }

    const id = useId()

    const classNames = {
      errorMessage: clsx(s.label, error && s.error),
      label: clsx(s.label, disabled && s.disabled),
      textArea: clsx(s.textArea, error && s.error, disabled && s.disabled),
      textAreaWrapper: s.textAreaWrapper,
      wrapperComponent: clsx(s.wrapper),
    }

    return (
      <div className={classNames.wrapperComponent}>
        <div>
          <label className={classNames.label} htmlFor={id}>
            {label}
          </label>
        </div>

        <div className={classNames.textAreaWrapper}>
          <textarea
            className={classNames.textArea}
            disabled={disabled}
            id={id}
            onChange={onChangeHandler}
            placeholder={'Text area'}
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
