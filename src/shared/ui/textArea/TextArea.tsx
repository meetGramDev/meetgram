import { ChangeEvent } from 'react'

import s from './TextArea.module.scss'

type TextAreaType = {
  error?: string
  label: string
  onChange: (value: string) => void
  value: string
}

export const TextArea = ({ error, label, onChange, value }: TextAreaType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.currentTarget.value)
  }

  return (
    <div className={s.wrapper}>
      <div>
        <label className={s.label} htmlFor={'text-area'}>
          {label}
        </label>
      </div>

      <div>
        <textarea
          className={s.textArea}
          id={'text-area'}
          onChange={onChangeHandler}
          placeholder={'Text area'}
          value={value}
        />
      </div>

      <div className={s.error}>{error}</div>
    </div>
  )
}
