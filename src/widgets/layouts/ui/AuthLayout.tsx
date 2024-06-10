import type { ReactElement, ReactNode } from 'react'

import { Header } from '@/widgets/header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`h-[calc(100vh_-_3.75rem_-_36px)] space-y-9 ${inter.className}`}>
      <Header />
      <main className={'flex h-full items-start justify-center'}>{children}</main>
    </div>
  )
}

export function getAuthLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}
