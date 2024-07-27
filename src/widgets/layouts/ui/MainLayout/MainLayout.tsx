import type { ReactElement, ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Header } from '@/widgets/header'
import { MobileHeader } from '@/widgets/mobileHeader'
import { Sidebar } from '@/widgets/sidebar'
import { Inter } from 'next/font/google'

import s from './MainLayout.module.scss'
const inter = Inter({ subsets: ['latin'] })

const MainLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

  return (
    <div className={`min-h-[calc(100vh_-_3.75rem_-_72px)] pb-9 ${inter.className}`}>
      {isMobile ? <MobileHeader /> : <Header />}
      <div className={s.page}>
        <Sidebar />
        <main className={s.main}>{children}</main>
      </div>
    </div>
  )
}

export function getMainLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
