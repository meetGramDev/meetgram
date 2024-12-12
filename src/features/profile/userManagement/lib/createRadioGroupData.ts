import { RadioGroupProps } from '@/shared/ui'

export const createRadioGroupData = (valueData: RadioGroupProps['options']): RadioGroupProps => {
  let returnedData

  if (valueData.length <= 1) {
    returnedData = {
      options: [
        { checked: true, disabled: false, label: valueData[0].label, value: valueData[0].value },
      ],
    }
  } else {
    returnedData = {
      options: valueData.map((el, index) => {
        if (index === 0) {
          return {
            checked: true,
            disabled: false,
            label: el.label,
            value: el.value,
          }
        } else {
          return {
            checked: false,
            disabled: false,
            label: el.label,
            value: el.value,
          }
        }
      }),
    }
  }

  return returnedData
}
