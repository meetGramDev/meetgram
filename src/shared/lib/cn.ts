import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A function safely merges classnames.
 * It applies clsx function and tailwind-merge function together.
 * @param [ClassValue[]] inputs
 * @returns a string of classnames
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
