/**
 * Creates an array of numbers (positive and/or negative) progressing from start up to, but not including, end.
 * @param start The start of the range.
 * @param end The end of the range.
 * @param step The value to increment by.
 * @returns Returns a new range array
 */
export function range(start: number, end: number, step: number) {
  const arr = []

  for (let i = start; i < end; i += step) {
    arr.push(i)
  }

  return arr
}
