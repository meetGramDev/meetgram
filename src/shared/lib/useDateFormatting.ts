import { useRouter } from 'next/router'

export function useDateFormatting(dateOf: string, options?: { addDays?: number }): string {
  const { locale } = useRouter()
  const date = new Date(dateOf)

  const daysToAdd = options?.addDays ?? 0

  date.setDate(date.getDate() + daysToAdd)

  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
}
