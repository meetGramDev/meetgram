import ReactDatePicker, { registerLocale } from 'react-datepicker'

import { Calendar } from '@/shared/assets/icons/Calendar'
import { range } from '@/shared/lib/range'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Nullable } from '@/shared/types'
import { Button, Input, Option, Select } from '@/shared/ui'
import clsx from 'clsx'
import { getMonth } from 'date-fns/getMonth'
import { getYear } from 'date-fns/getYear'
import { be, es, uk } from 'date-fns/locale'
import { enUS } from 'date-fns/locale/en-US'
import { ru } from 'date-fns/locale/ru'
import { useRouter } from 'next/router'

import 'react-datepicker/dist/react-datepicker.css'

import s from './DatePicker.module.scss'

registerLocale('ru', ru)
registerLocale('en', enUS)
registerLocale('be', be)
registerLocale('es', es)
registerLocale('uk', uk)

const years = range(1901, getYear(new Date()) + 1, 1)

type Props = {
  disabled?: boolean
  endDate?: Date | undefined
  error?: Nullable<string>
  inputClassName?: boolean
  label?: string
  onEndDateChange?: (date: Date | undefined) => void
  onStartDateChange: (date: Date | undefined) => void
  required?: boolean
  /**
   * Toggle date selector in range
   */
  selectsRange?: true | undefined
  startDate: Date | undefined
}

export const DatePicker = ({
  disabled,
  endDate,
  error,
  inputClassName,
  label,
  onEndDateChange,
  onStartDateChange,
  required,
  selectsRange,
  startDate,
}: Props) => {
  const t = useTranslate()
  const { locale } = useRouter()

  const monthMonth: string[] = [
    t('January'),
    t('February'),
    t('March'),
    t('April'),
    t('May'),
    t('June'),
    t('July'),
    t('August'),
    t('September'),
    t('October'),
    t('November'),
    t('December'),
  ]

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
      {/* @ts-ignore */}
      <ReactDatePicker
        calendarClassName={s.calendar}
        className={classes.hasError}
        customInput={
          <Input className={clsx(s.dateInput, inputClassName && s.hasError)} error={error} />
        }
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
                  defaultValue={monthMonth[getMonth(date)]}
                  onValueChange={value => changeMonth(+value)}
                  rootClassName={s.datePickerSelector}
                  showArrow={false}
                  value={getMonth(date).toString()}
                  withPortal={false}
                >
                  {monthMonth.map((m, i) => (
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
                  type={'button'}
                  variant={'text'}
                >
                  {'<'}
                </Button>
                <Button
                  className={s.changeMonthsBtn}
                  disabled={nextMonthButtonDisabled}
                  onClick={increaseMonth}
                  type={'button'}
                  variant={'text'}
                >
                  {'>'}
                </Button>
              </div>
            </div>
          )
        }}
        selected={startDate}
        selectsMultiple={undefined}
        selectsRange={selectsRange}
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
