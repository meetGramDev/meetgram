import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import { Calendar } from '@/shared/assets/icons/Calendar'
import { Nullable } from '@/shared/types'
import { Input } from '@/shared/ui'
import clsx from 'clsx'

import 'react-datepicker/dist/react-datepicker.css'

import s from './DatePicker.module.scss'

type Props = {
  disabled?: boolean
  error?: Nullable<string>
  label?: string
  required?: boolean
}

export const DatePicker = ({ disabled, error, label, required }: Props) => {
  const [startDate, setStartDate] = useState(new Date())

  const locale = navigator.language

  const classes = {
    hasError: clsx(error && s.hasError),
    label: clsx(s.label, required && s.required, disabled && s.dimmedLabel),
  }

  return (
    <div className={s.dateContainer}>
      <label className={classes.label}>{label}</label>
      <ReactDatePicker
        calendarClassName={s.calendar}
        className={classes.hasError}
        customInput={<Input className={s.dateInput} error={error} />}
        dateFormat={'dd/MM/yyyy'}
        dayClassName={(date: Date) => s.day}
        disabled={disabled}
        icon={<Calendar className={clsx(s.datePickerIcon, classes.hasError)} />}
        locale={locale}
        onChange={date => date && setStartDate(date)}
        popperClassName={s.popper}
        selected={startDate}
        showIcon
        showPopperArrow={false}
        toggleCalendarOnIconClick
        wrapperClassName={s.globalWrapper}
      />
    </div>
  )
}
