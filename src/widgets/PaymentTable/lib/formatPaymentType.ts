import { PaymentType } from '@/features/profile/subscriptions'

export function formatPaymentType(payment: PaymentType) {
  switch (payment) {
    case 'PAYPAL':
      return `Paypal`
    case 'CREDIT_CARD':
      return 'Credit card'
    case 'STRIPE':
      return 'Stripe'
    default:
      break
  }
}
