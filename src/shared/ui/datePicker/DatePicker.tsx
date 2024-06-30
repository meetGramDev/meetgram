import { useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'

import { Calendar } from '@/shared/assets/icons/Calendar'
import { Nullable } from '@/shared/types'
import { Input } from '@/shared/ui'
import clsx from 'clsx'
// import { ru } from 'date-fns/locale/ru'

import 'react-datepicker/dist/react-datepicker.css'

import s from './DatePicker.module.scss'

// registerLocale('ru', ru)
// setDefaultLocale('ru')

type Props = {
  disabled?: boolean
  error?: Nullable<string>
  label?: string
  required?: boolean
  selectRange?: boolean
}

export const DatePicker = ({ disabled, error, label, required, selectRange }: Props) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const locale = navigator.language

  const classes = {
    hasError: clsx(error && s.hasError),
    label: clsx(s.label, required && s.required, disabled && s.dimmedLabel),
  }

  const onRangeChange = (dates: [Date | null, Date | null] | Date | null) => {
    if (!dates) {
      return
    }

    // typechecking
    if (Array.isArray(dates)) {
      if (dates.length !== 2) {
        return
      }

      const [start, end] = dates

      setStartDate(start || undefined)
      setEndDate(end || undefined)
    } else {
      setStartDate(dates)
    }
  }

  return (
    <div className={s.dateContainer}>
      <label className={classes.label}>{label}</label>
      {/* @ts-ignore */}
      <ReactDatePicker
        calendarClassName={s.calendar}
        className={classes.hasError}
        customInput={<Input className={s.dateInput} error={error} />}
        dateFormat={'dd/MM/yyyy'}
        dayClassName={(date: Date) => s.day}
        disabled={disabled}
        endDate={endDate}
        icon={<Calendar className={clsx(s.datePickerIcon, classes.hasError)} />}
        locale={locale}
        onChange={onRangeChange}
        popperClassName={s.popper}
        selected={startDate}
        selectsRange={selectRange || undefined}
        shouldCloseOnSelect={!selectRange}
        showIcon
        showPopperArrow={false}
        startDate={startDate}
        swapRange
        toggleCalendarOnIconClick
        wrapperClassName={s.globalWrapper}
      />
    </div>
  )
}
