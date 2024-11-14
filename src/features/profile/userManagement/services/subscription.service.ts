import { baseApi } from '@/shared/api'

type CurrentPaymentType = {
  data?: DataResponseType[]
  hasAutoRenewal: boolean
}
type DataResponseType = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}
export const subscriptionServiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCostOfPaymentSubscription: builder.query<any, any>({
      query: body => ({
        method: 'GET',
        url: '/subscriptions/cost-of-payment-subscriptions',
      }),
    }),

    getCurrentPayment: builder.query<CurrentPaymentType, void>({
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

export const { useGetCostOfPaymentSubscriptionQuery, useGetCurrentPaymentQuery } =
  subscriptionServiceApi
