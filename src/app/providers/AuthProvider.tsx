import { ReactNode } from 'react'

import { useMeQuery } from '@/entities/user'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useMeQuery()

  // eslint-disable-next-line no-console
  console.log(data)

  return <>{children}</>
}
