import type { ReactElement, ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

import { selectIsUserAuth } from '@/entities/user'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Header } from '@/widgets/header'
import { MobileHeader } from '@/widgets/mobileHeader'
import { Sidebar } from '@/widgets/sidebar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const MainLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
  const isAuth = useAppSelector(selectIsUserAuth)

  return (
    <div className={`min-h-[calc(100vh_-_3.75rem_-_72px)] pb-9 ${inter.className}`}>
      {isMobile ? <MobileHeader isAuth={isAuth} /> : <Header isAuth={isAuth} />}
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main className={'flex h-full items-start justify-center'}>{children}</main>
      </div>
    </div>
  )
}

export function getMainLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
