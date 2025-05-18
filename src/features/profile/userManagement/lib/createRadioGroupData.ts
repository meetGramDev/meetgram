import { LocalesType, TranslationPhraseType } from '@/shared/config/i18n'
import { RadioGroupProps } from '@/shared/ui'

export const createRadioGroupData = (
  valueData: RadioGroupProps['options'],
  t?: (key: string) => string
): RadioGroupProps => {
  let returnedData

  const translateValue = (label: string) => {
    return t ? t(label) : label
  }

  if (valueData.length <= 1) {
    returnedData = {
      options: [
        {
          checked: true,
          disabled: false,
          label: translateValue(valueData[0].label),
          value: translateValue(valueData[0].value),
        },
      ],
    }
  } else {
    returnedData = {
      options: valueData.map((el, index) => {
        if (index === 0) {
          return {
            checked: true,
            disabled: false,
            label: translateValue(el.label),
            value: translateValue(el.value),
          }
        } else {
          return {
            checked: false,
            disabled: false,
            label: translateValue(el.label),
            value: translateValue(el.value),
          }
        }
      }),
    }
  }

  return returnedData
}
