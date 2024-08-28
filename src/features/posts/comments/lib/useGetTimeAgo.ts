export const UseGetTimeAgo = (lang: 'locale', createdAt: string) => {
  const date = new Date(createdAt)
  const timeMs = date.getTime()
  const nowUTC = new Date().getTime()
  const deltaSeconds = Math.round((timeMs - nowUTC) / 1000)
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity]

  const units: Intl.RelativeTimeFormatUnit[] = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'months',
    'year',
  ]

  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds))
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1

  const rtf = new Intl.RelativeTimeFormat(lang, {
    numeric: 'always',
    style: 'long',
  })

  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex])
}
