import { ReactNode } from 'react'

import { useMeQuery } from '@/entities/user'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useMeQuery()

  return <>{children}</>
}
