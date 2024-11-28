import { CostOfPaymentSubscriptionType } from '@/features/profile/userManagement'
import { RadioGroupProps } from '@/shared/ui/radioGroup'

export const changeCostOfPayment = (
  data: CostOfPaymentSubscriptionType
): RadioGroupProps['options'] => {
  const newData: RadioGroupProps['options'] = data.data.map(item => {
    let changedLabel: string = item.typeDescription

    if (item.typeDescription === 'DAY') {
      changedLabel = `$${item.amount} per 1 day`
    } else if (item.typeDescription === 'WEEKLY') {
      changedLabel = `$${item.amount} per 7 day`
    } else if (item.typeDescription === 'MONTHLY') {
      changedLabel = `$${item.amount} per month`
    }

    return {
      label: changedLabel,
      value: `${item.amount}`,
    }
  })

  return newData
}
