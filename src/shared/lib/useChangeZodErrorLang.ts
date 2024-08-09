import type { FieldValues } from 'react-hook-form'

import { useEffect } from 'react'

import { useRouter } from 'next/router'

/**
 * Synchronizing zod errors when language changed
 * @param fields that have been touched
 * @param callback invokes on each field and pass field name as string
 */
export function useChangeZodErrorLang<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends keyof TFieldValues = keyof TFieldValues,
>(fields: TFieldValues, callback: (args: TFieldName) => any) {
  const { locale } = useRouter()

  useEffect(() => {
    if (!locale) {
      return
    }

    for (const [key, isTouched] of Object.entries(fields)) {
      if (isTouched) {
        callback(key as TFieldName)
      }
    }
  }, [locale])
}
