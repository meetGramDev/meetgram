import { ReactNode } from 'react'

import { useMeQuery } from '@/entities/user'
import { useConnectSocket } from '@/shared/lib'

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  useMeQuery()

  useConnectSocket()

  return <>{children}</>
}
