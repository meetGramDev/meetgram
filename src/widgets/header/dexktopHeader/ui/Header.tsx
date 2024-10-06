import { selectIsUserAuth } from '@/entities/user'
import { Notification } from '@/shared/assets/icons/Notification'
import { HOME, SIGN_IN, SIGN_UP } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { useTranslate } from '@/shared/lib/useTranslate'
import { Button } from '@/shared/ui/button/button'
import { LangSwitcher } from '@/widgets/langSwitcher'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  className?: string
  notification?: number
}

export const Header = ({ className, notification }: Props) => {
  const router = useRouter()

  const t = useTranslate()

  const isAuth = useAppSelector(selectIsUserAuth)

  return (
    <header
      className={clsx(
        'flex h-[3.75rem] w-full items-center justify-between border-b border-[#333] px-[3.75rem]',
        className
      )}
    >
      <Link className={'text-large font-semibold'} href={HOME}>
        Meetgram
      </Link>
      <div className={'flex items-center justify-between gap-[2.25rem]'}>
        <div className={'flex items-center justify-end gap-[1.5rem]'}>
          {isAuth && (
            <>
              <Button variant={'text'}>
                <div className={'relative text-light-100'}>
                  <Notification
                    className={'fill-current transition-all duration-300 hover:fill-accent-500'}
                  />
                  {notification && (
                    <div
                      className={
                        'absolute left-[10px] top-[-5px] flex aspect-square h-[13px] items-center justify-center rounded-full bg-danger-500 px-1 text-[0.625rem] text-light-100'
                      }
                    >
                      {notification}
                    </div>
                  )}
                </div>
              </Button>
            </>
          )}
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
