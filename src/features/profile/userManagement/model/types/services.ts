export type PaymentType = 'CREDIT_CARD' | 'PAYPAL' | 'STRIPE'
export type SubscriptionType = 'DAY' | 'MONTHLY' | 'WEEKLY'

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

export type CostOfPaymentSubscriptionType = {
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

export type PaymentModel = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: number
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number | string
}

export type PaymentSessionResponse = {
  url: string
}
