export type PaymentType = 'CREDIT_CARD' | 'PAYPAL' | 'STRIPE'
export type SubscriptionType = 'DAY' | 'MONTHLY' | 'WEEKLY'

export type CreateSubscriptionModel = {
  amount: number
  baseUrl: string
  paymentType: PaymentType
  typeSubscription: SubscriptionType
}

export type PaymentSessionResponse = {
  url: string
}
