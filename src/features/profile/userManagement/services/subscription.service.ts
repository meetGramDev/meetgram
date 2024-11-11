import { baseApi } from '@/shared/api'

export const subscriptionService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentPayment: builder.query<
      {
        data: [
          {
            autoRenewal: boolean
            dateOfPayment: string
            endDateOfSubscription: string
            subscriptionId: string
            userId: number
          },
        ]
        hasAutoRenewal: boolean
      },
      void
    >({
      query: () => ({
        method: 'GET',
        url: '/subscriptions/current-payment-subscriptions',
      }),
    }),
  }),
})

export const { useGetCurrentPayment } = subscriptionService
