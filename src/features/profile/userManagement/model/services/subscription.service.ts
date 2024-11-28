import {
  CostOfPaymentSubscriptionType,
  CreatePaymentRequestType,
  CurrentPaymentType,
  PaymentSessionResponse,
} from '@/features/profile/userManagement/model/types/services'
import { baseApi } from '@/shared/api'

export const subscriptionServiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPaymentSubscription: builder.mutation<PaymentSessionResponse, CreatePaymentRequestType>({
      invalidatesTags: (result, error, arg) => (!error ? ['subscriptions'] : []),
      query: body => ({
        body,
        method: 'POST',
        url: '/subscriptions',
      }),
    }),

    getCostOfPaymentSubscription: builder.query<CostOfPaymentSubscriptionType, void>({
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

export const {
  useCreatePaymentSubscriptionMutation,
  useGetCostOfPaymentSubscriptionQuery,
  useGetCurrentPaymentQuery,
} = subscriptionServiceApi
