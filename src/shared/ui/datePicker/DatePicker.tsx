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

type Props = {
  disabled?: boolean
  endDate?: Date | undefined
  error?: Nullable<string>
  label?: string
  onEndDateChange?: (date: Date | undefined) => void
  onStartDateChange: (date: Date | undefined) => void
  required?: boolean
  /**
   * Toggle date selector in range
   */
  selectsRange?: boolean
  startDate: Date | undefined
}

export const DatePicker = ({
  disabled,
  endDate,
  error,
  label,
  onEndDateChange,
  onStartDateChange,
  required,
  selectsRange,
  startDate,
}: Props) => {
  const locale = navigator.language
  const localeMonths: Locales = locale.substring(0, 2) as Locales

  const classes = {
    hasError: clsx(error && s.hasError),
    label: clsx(s.label, required && s.required, disabled && s.dimmedLabel),
  }

  const handleOnChange = (dates: [Date | null, Date | null] | Date | null) => {
    if (!dates) {
      return
    }

    // typechecking
    if (Array.isArray(dates)) {
      if (dates.length !== 2) {
        return
      }

      const [start, end] = dates

      onStartDateChange(start || undefined)
      onEndDateChange?.(end || undefined)
    } else {
      onStartDateChange(dates)
    }
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
        endDate={endDate}
        icon={<Calendar className={clsx(s.datePickerIcon, classes.hasError)} />}
        locale={locale}
        onChange={handleOnChange}
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
        /* Prop disables ts error */
        selectsMultiple={undefined}
        selectsRange={selectsRange || undefined}
        shouldCloseOnSelect={!selectsRange}
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
