import { selectCurrentUserId, selectIsUserAuth } from '@/entities/user'
import { PROFILE, PUBLIC_PAGE, SIGN_IN, SIGN_UP } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button } from '@/shared/ui/button/button'
import { LangSwitcher } from '@/widgets/langSwitcher'
import { NotificationsView } from '@/widgets/notificationsView/ui/NotificationsView'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  className?: string
}

export const Header = ({ className }: Props) => {
  const router = useRouter()

  const t = useTranslate()

  const isAuth = useAppSelector(selectIsUserAuth)
  const userId = useAppSelector(selectCurrentUserId)

  return (
    <header
      className={clsx(
        'flex h-[3.75rem] w-full items-center justify-between border-b border-[#333] px-[3.75rem]',
        className
      )}
    >
      <Link
        className={'text-large font-semibold'}
        href={!isAuth ? PUBLIC_PAGE : `${PROFILE}/${userId}`}
      >
        Meetgram
      </Link>
      <div className={'flex items-center justify-between gap-[2.25rem]'}>
        <div className={'flex items-center justify-end gap-[1.5rem]'}>
          {isAuth && <NotificationsView />}
          <LangSwitcher />
        </div>

        {!router.pathname.startsWith('/auth') && !isAuth && (
          <div className={'flex gap-6'}>
            <Button as={Link} href={SIGN_IN} variant={'link'}>
              {t('Sign In')}
            </Button>
            <Button as={Link} href={SIGN_UP} variant={'primary'}>
              {t('Sign Up')}
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
