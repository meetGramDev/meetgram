import type { ReactElement, ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

import { SelectIsUserAuth } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Header } from '@/widgets/header'
import { MobileHeader } from '@/widgets/mobileHeader'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
  const isAuth = useAppSelector(SelectIsUserAuth)

  return (
    <div className={`min-h-[calc(100vh_-_3.75rem_-_72px)] space-y-9 pb-9 ${inter.className}`}>
      {isMobile ? <MobileHeader isAuth={isAuth} /> : <Header isAuth={isAuth} />}
      <main className={'flex h-full items-start justify-center'}>{children}</main>
    </div>
  )
}

export function getAuthLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}
