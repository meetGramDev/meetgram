import { PaymentType, SubscriptionType } from '@/features/profile/subscriptions'

export type CurrentPaymentType = {
  data?: DataResponseType[]
  hasAutoRenewal: boolean
}
export type DataResponseType = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type GetCostOfPaymentSubscriptionType = {
  data: CostOfPaymant[]
}
export type CostOfPaymant = {
  amount: number
  typeDescription: SubscriptionType
}

export type CreatePaymentRequestType = {
  amount: number
  baseUrl: string
  paymentType: PaymentType
  typeSubscription: SubscriptionType
}
