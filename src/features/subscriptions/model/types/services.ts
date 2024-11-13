export type PaymentType = 'CREDIT_CARD' | 'PAYPAL' | 'STRIPE'
export type SubscriptionType = 'DAY' | 'MONTHLY' | 'WEEKLY'

export type PaymentModel = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: number
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number | string
}
