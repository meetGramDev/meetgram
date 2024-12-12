import { PaymentType } from '@/features/profile/userManagement/model/types/services'

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
