import { SubscriptionType } from '@/features/subscriptions'

export function formatSubscriptionType(subscription: SubscriptionType) {
  switch (subscription) {
    case 'DAY':
      return `1 day`
    case 'MONTHLY':
      return `1 month`
    case 'WEEKLY':
      return `7 days`
    default:
      break
  }
}
