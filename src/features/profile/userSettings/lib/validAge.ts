export const validAge = (date: Date | number): boolean => {
  const timeMs = typeof date === 'number' ? date : date.getTime()
  const dateToCompare = new Date(timeMs)

  const currentDate = new Date()
  const pastDate = new Date(
    currentDate.getFullYear() - 13,
    currentDate.getMonth(),
    currentDate.getDate()
  )

  return dateToCompare < pastDate
}
