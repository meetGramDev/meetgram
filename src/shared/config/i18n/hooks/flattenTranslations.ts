import { TranslationNode } from '../types'

export function flattenTranslations(translation: TranslationNode) {
  const result: Record<string, string> = {}

  function flattenPath(obj: TranslationNode, parentKey?: string) {
    for (const [key, value] of Object.entries(obj)) {
      // check the current nested level
      const path = parentKey ? `${parentKey}.${key}` : key

      if (typeof value === 'object' && value !== null) {
        flattenPath(value, path) // Recursively flatten nested objects
      } else {
        result[path] = value // Assign value directly for non-object types
      }
    }
  }

  flattenPath(translation)

  return result
}
