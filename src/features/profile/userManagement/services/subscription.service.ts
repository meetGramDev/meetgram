import { baseApi } from '@/shared/api'
import { BaseQueryArg } from '@reduxjs/toolkit/query'

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
export enum Period {
  day = 'DAY',
  month = 'MONTHLY',
  week = 'WEEKLY',
}
export enum PaymentMethod {
  creditCard = 'CREDIT_CARD',
  paypal = 'PAYPAL',
  stripe = 'STRIPE',
}
export type CreatePaymentRequestType = {
  amount: number
  baseUrl: string
  paymentType: PaymentMethod
  typeSubscription: Period
}

export type ResponseCreatePaymentType = {
  url: string
}

export const subscriptionServiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPaymentSubscription: builder.mutation<
      ResponseCreatePaymentType,
      CreatePaymentRequestType
    >({
      query: body => ({
        body,
        method: 'POST',
        url: '/subscriptions',
      }),
    }),

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

export const {
  useCreatePaymentSubscriptionMutation,
  useGetCostOfPaymentSubscriptionQuery,
  useGetCurrentPaymentQuery,
} = subscriptionServiceApi
