const calcDaysPassed = (date1: Date, date2: Date) =>
  Math.round(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))

export function formatDateISOToTime(
  date: Date,
  locale: string = 'en',
  options: {
    /**
     * Should show a timestamp in the text format date. Default `true`
     */
    showTime?: boolean
  } = { showTime: true }
) {
  const daysPassed = calcDaysPassed(new Date(), date)
  const showTimeOrYear = date < new Date()

  if (daysPassed === 0) {
    return new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(date)
  }
  if (daysPassed === 1) {
    return `Yesterday${options.showTime ? ', ' + new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(date) : ''}`
  }
  if (daysPassed <= 2) {
    return `${daysPassed} days ago${options.showTime ? ', ' + new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(date) : ''}`
  }

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    ...(showTimeOrYear ? { hour: '2-digit', minute: '2-digit' } : { year: 'numeric' }),
  }).format(date)
}
