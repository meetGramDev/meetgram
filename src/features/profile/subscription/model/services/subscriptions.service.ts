import { baseApi } from '@/shared/api'

import { CreateSubscriptionModel, PaymentSessionResponse } from '../types/services'

export const profileService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createSubscription: builder.mutation<PaymentSessionResponse, CreateSubscriptionModel>({
      invalidatesTags: (result, error, arg) => (!error ? ['subscriptions'] : []),
      query: body => ({
        body,
        method: 'POST',
        url: '/subscriptions',
      }),
    }),
  }),
})
