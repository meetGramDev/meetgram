import { ReactElement, ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Header, MobileHeader } from '@/widgets/header'
import { MobileSidebar, Sidebar } from '@/widgets/sidebar'
import clsx from 'clsx'
import { Inter } from 'next/font/google'

import s from './MainLayout.module.scss'

const inter = Inter({ subsets: ['latin'] })

const MainLayout = ({ children, isPublic }: { children: ReactNode; isPublic?: boolean }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

  return (
    <div className={`min-h-[calc(100vh_-_3.75rem_-_72px)] ${inter.className}`}>
      <div>
        {isMobile ? (
          <MobileHeader />
        ) : (
          <div>
            <Header />
          </div>
        )}
      </div>
      <div className={s.page}>
        {!isPublic && !isMobile && <Sidebar className={s.fixedSidebar} />}
        <main className={clsx(isPublic ? s.public : s.main)}>{children}</main>
      </div>
      <div>{!isPublic && isMobile && <MobileSidebar className={s.fixedSidebar} />}</div>
    </div>
  )
}

export function getMainLayout(page: ReactElement, isPublic?: boolean) {
  return <MainLayout isPublic={isPublic}>{page}</MainLayout>
}
