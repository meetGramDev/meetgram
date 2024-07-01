import { useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'

import { Calendar } from '@/shared/assets/icons/Calendar'
import { range } from '@/shared/lib/range'
import { Nullable } from '@/shared/types'
import { Button, Input, Option, Select } from '@/shared/ui'
import clsx from 'clsx'
import { getMonth } from 'date-fns/getMonth'
import { getYear } from 'date-fns/getYear'
import { enUS } from 'date-fns/locale/en-US'
import { ru } from 'date-fns/locale/ru'

import 'react-datepicker/dist/react-datepicker.css'

import s from './DatePicker.module.scss'

registerLocale('ru-RU', ru)
registerLocale('en-US', enUS)

type Props = {
  disabled?: boolean
  error?: Nullable<string>
  label?: string
  required?: boolean
  selectRange?: boolean
}

const years = range(1940, getYear(new Date()) + 1, 1)
const months = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
}

type Locales = keyof typeof months

export const DatePicker = ({ disabled, error, label, required, selectRange }: Props) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const locale = navigator.language
  const localeMonths: Locales = locale.substring(0, 2) as Locales

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
        renderCustomHeader={({
          changeMonth,
          changeYear,
          date,
          decreaseMonth,
          increaseMonth,
          nextMonthButtonDisabled,
          prevMonthButtonDisabled,
        }) => {
          return (
            <div className={s.customHeaderContainer}>
              <div>
                <Select
                  contentClassName={s.monthSelector}
                  defaultValue={months[localeMonths][getMonth(date)]}
                  onValueChange={value => changeMonth(+value)}
                  rootClassName={s.datePickerSelector}
                  showArrow={false}
                  value={getMonth(date).toString()}
                  withPortal={false}
                >
                  {months[localeMonths].map((m, i) => (
                    <Option key={i} value={i.toString()}>
                      {m}
                    </Option>
                  ))}
                </Select>

                <Select
                  contentClassName={s.yearSelector}
                  defaultValue={getYear(date).toString()}
                  onValueChange={value => changeYear(+value)}
                  rootClassName={s.datePickerSelector}
                  showArrow={false}
                  value={getYear(date).toString()}
                  withPortal={false}
                >
                  {years.map(y => (
                    <Option key={y} value={y.toString()}>
                      {y}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <Button
                  className={s.changeMonthsBtn}
                  disabled={prevMonthButtonDisabled}
                  onClick={decreaseMonth}
                  variant={'text'}
                >
                  {'<'}
                </Button>
                <Button
                  className={s.changeMonthsBtn}
                  disabled={nextMonthButtonDisabled}
                  onClick={increaseMonth}
                  variant={'text'}
                >
                  {'>'}
                </Button>
              </div>
            </div>
          )
        }}
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
