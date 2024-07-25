import { selectCurrentUserEmail } from '@/entities/user'
import { LogOut } from '@/features/auth/logOut'
import { Notification } from '@/shared/assets/icons/Notification'
import { HOME, SIGN_IN, SIGN_UP } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { translate } from '@/shared/lib/langSwitcher'
import { Button } from '@/shared/ui/button/button'
import { LangSwitcher } from '@/widgets/langSwitcher'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  isAuth?: boolean
  notification?: number
}

export const Header = ({ isAuth = false, notification }: Props) => {
  const t = translate(useRouter().locale)
  const email = useAppSelector(selectCurrentUserEmail)

  return (
    <header
      className={
        'flex h-[3.75rem] w-full items-center justify-between border-b border-[#333] px-[3.75rem]'
      }
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

              <LogOut email={email} />
            </>
          )}

          <LangSwitcher />
        </div>

        {!isAuth && (
          <div className={'flex gap-6'}>
            <Button as={Link} href={SIGN_IN} variant={'link'}>
              {t['Sign In']}
            </Button>
            <Button as={Link} href={SIGN_UP} variant={'primary'}>
              {t['Sign Up']}
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
