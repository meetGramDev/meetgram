export const getTimeAgo = (lang: string | undefined, createdAt: string) => {
  const date = new Date(createdAt)
  const timeMs = date.getTime()
  const nowUTC = new Date().getTime()
  const deltaSeconds = Math.round((nowUTC - timeMs) / 1000)
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity]

  const units: Intl.RelativeTimeFormatUnit[] = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ]

  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds))
  const divisor = unitIndex > 0 ? cutoffs[unitIndex - 1] : 1

  const rtf = new Intl.RelativeTimeFormat(lang, {
    numeric: 'always',
    style: 'long',
  })

  return rtf.format(-Math.floor(Math.abs(deltaSeconds) / divisor), units[unitIndex])
}
