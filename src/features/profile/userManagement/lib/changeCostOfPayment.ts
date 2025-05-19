import { RadioGroupProps } from '@/shared/ui'

import { LanguagesObjType } from '../../../../../public/locales/en'
import { CostOfPaymentSubscriptionType } from '../model/types/services'

export const changeCostOfPayment = (
  data: CostOfPaymentSubscriptionType,
  t?: (key: any) => string
): RadioGroupProps['options'] => {
  const translateValue = (label: any) => {
    return t ? t(label) : label
  }

  const newData: RadioGroupProps['options'] = data.data.map(item => {
    let changedLabel: string = item.typeDescription

    if (item.typeDescription === 'DAY') {
      changedLabel = `$${item.amount} ${translateValue('per 1 day')}`
    } else if (item.typeDescription === 'WEEKLY') {
      changedLabel = `$${item.amount} ${translateValue('per 7 days')}`
    } else if (item.typeDescription === 'MONTHLY') {
      changedLabel = `$${item.amount} ${translateValue('per month')}`
    }

    return {
      label: changedLabel,
      value: `${item.amount}`,
    }
  })

  return newData
}
