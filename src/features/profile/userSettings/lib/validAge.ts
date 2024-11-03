export const validAge = (date: Date | number) => {
  const timeMs = typeof date === 'number' ? date : undefined
  let dateToCompare
  if (timeMs !== undefined) {
    dateToCompare = new Date(timeMs)
  }

  const currentDate = new Date()
  const pastDate = new Date(
    currentDate.getFullYear() - 13,
    currentDate.getMonth(),
    currentDate.getDate()
  )
  if (dateToCompare) return dateToCompare < pastDate
}
