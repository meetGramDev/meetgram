import type { FieldNamesMarkedBoolean, FieldPath, FieldValues } from 'react-hook-form'

import { useEffect } from 'react'

import { useRouter } from 'next/router'

/**
 * Synchronizing zod errors when language changed
 * @param fields object of fields that have been touched
 * @param callback invokes on each field and pass field name as string
 * @param locale utilizes as a trigger to activate an effect. If not passed, locale from next router is used
 */
export function useChangeZodErrorLang<
  TFieldValues extends FieldValues = FieldValues,
  TTouchedFields extends TouchedFields<TFieldValues> = TouchedFields<TFieldValues>,
  TFieldName extends FieldPath<TTouchedFields> = FieldPath<TTouchedFields>,
>(fields: TTouchedFields, callback: (args: TFieldName) => any, locale?: readonly [string]): void {
  const { locale: localeRouter } = useRouter()

  const localeDeps = locale ?? [localeRouter || 'en']

  useEffect(() => {
    if (localeDeps.length !== 1) {
      return
    }

    for (const [key, isTouched] of Object.entries(fields)) {
      if (isTouched) {
        callback(key as TFieldName)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, localeDeps)
}

type TouchedFields<T extends FieldValues> = Partial<Readonly<FieldNamesMarkedBoolean<T>>>
