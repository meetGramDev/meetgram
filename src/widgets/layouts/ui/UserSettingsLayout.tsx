import type { ReactElement, ReactNode } from 'react'

const UserSettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'my-2.25 mt-2.25 container mx-4 ml-1.5'}>
      <div className={'profile mt-1.5 flex gap-2.5'}>
        <div className={'photo flex items-center justify-center'}>Photo component</div>
        <main className={'mainContent flex max-w-[73.7vw] justify-center'}>{children}</main>
      </div>
    </div>
  )
}

export function getUserSettingsLayout(page: ReactElement) {
  return <UserSettingsLayout>{page}</UserSettingsLayout>
}
