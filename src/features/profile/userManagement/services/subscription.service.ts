import { baseApi } from '@/shared/api'

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
  typeDescription: Period
}
enum Period {
  day = 'DAY',
  month = 'MONTHLY',
  week = 'WEEKLY',
}
export const subscriptionServiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCostOfPaymentSubscription: builder.query<GetCostOfPaymentSubscriptionType, void>({
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
