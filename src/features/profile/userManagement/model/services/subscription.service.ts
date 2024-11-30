import {
  CostOfPaymentSubscriptionType,
  CreatePaymentRequestType,
  CurrentPaymentType,
  PaymentSessionResponse,
} from '@/features/profile/userManagement/model/types/services'
import { baseApi } from '@/shared/api'

export const subscriptionServiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    autoRenewal: builder.mutation<void, void>({
      invalidatesTags: (result, error, arg) => (!error ? ['subscriptions'] : []),
      query: () => ({
        method: 'POST',
        url: '/subscriptions/canceled-auto-renewal',
      }),
    }),

    createPaymentSubscription: builder.mutation<PaymentSessionResponse, CreatePaymentRequestType>({
      invalidatesTags: (result, error, arg) => (!error ? ['subscriptions'] : []),
      query: body => ({
        body,
        method: 'POST',
        url: '/subscriptions',
      }),
    }),
    getCostOfPaymentSubscription: builder.query<CostOfPaymentSubscriptionType, void>({
      query: args => ({
        method: 'GET',
        url: '/subscriptions/cost-of-payment-subscriptions',
      }),
    }),
    getCurrentPayment: builder.query<CurrentPaymentType, void>({
      providesTags: () => [{ type: 'subscriptions' }],
      query: args => ({
        method: 'GET',
        url: `/subscriptions/current-payment-subscriptions`,
      }),
    }),
  }),
})

export const {
  useAutoRenewalMutation,
  useCreatePaymentSubscriptionMutation,
  useGetCostOfPaymentSubscriptionQuery,
  useGetCurrentPaymentQuery,
} = subscriptionServiceApi
