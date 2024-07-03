import { type ReactNode, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'

import { Nullable } from '@/shared/types'
import { setupListeners } from '@reduxjs/toolkit/query'

import { AppStore, makeStore } from './store'

type Props = {
  readonly children: ReactNode
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<Nullable<AppStore>>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch)

      return unsubscribe
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
