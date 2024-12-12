export function dateFormatting(
  dateOf: string,
  options?: { addDays?: number; locale: string }
): string {
  const date = new Date(dateOf)

  const daysToAdd = options?.addDays ?? 0

  date.setDate(date.getDate() + daysToAdd)

  return date.toLocaleDateString(options?.locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
}
