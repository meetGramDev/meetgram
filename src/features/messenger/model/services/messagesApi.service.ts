import { baseApi } from '@/shared/api'

import { GetAllDialogsResponseType, GetAllMessagesArgsType } from '../types'

export const messagesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllDialogs: builder.query<GetAllDialogsResponseType, GetAllMessagesArgsType>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor
      },
      merge: (currentCacheData, responseData, otherArgs) => {
        if (!otherArgs.arg.cursor) {
          return responseData
        }

        Object.assign(currentCacheData, responseData)
        currentCacheData.items.push(...responseData.items)
      },
      providesTags: res =>
        res
          ? [
              { id: 'LIST', type: 'messages' },
              ...res.items.map(({ id }) => ({ id, type: 'messages' as const })),
            ]
          : [{ id: 'LIST', type: 'messages' }],
      query: ({ ...params }) => ({
        params,
        url: `/messanger`,
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
  }),
})

export const { useGetAllDialogsQuery } = messagesApi
