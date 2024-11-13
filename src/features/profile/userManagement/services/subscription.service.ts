import { baseApi } from '@/shared/api'

export const subscriptionServiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentPayment: builder.query<any, void>({
      query: body => ({
        method: 'GET',
        url: '/subscriptions/current-payment-subscriptions',
      }),
    }),
  }),
})
//   = baseApi.injectEndpoints({
//   endpoints: builder => ({
//     getCurrentPayment: builder.query<
//       {
//         data: [
//           {
//             autoRenewal: boolean
//             dateOfPayment: string
//             endDateOfSubscription: string
//             subscriptionId: string
//             userId: number
//           },
//         ]
//         hasAutoRenewal: boolean
//       },
//       void
//     >({
//       query: () => ({
//         method: 'GET',
//         url: '/subscriptions/current-payment-subscriptions',
//       }),
//     }),
//   }),
// })

export const { useGetCurrentPaymentQuery } = subscriptionServiceApi
