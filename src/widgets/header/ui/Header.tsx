'use client'
import { Tr } from '@/hooks/useLangSwitcher'
import { Notification } from '@/shared/assets/icons/Notification'
import { HOME, SIGN_IN, SIGN_UP } from '@/shared/config/router'
import { Button } from '@/shared/ui/button/button'
import { OptionType } from '@/shared/ui/select/option'
import { LangSwitcher } from '@/widgets/langSwitcher'
import Link from 'next/link'
import { useRouter } from 'next/router'

const languages: OptionType[] = [
  { label: 'Russian', value: 'ru' },
  { label: 'English', value: 'en' },
]

type Props = {
  isAuth?: boolean
  notification?: number
}

export const Header = ({ isAuth = false, notification }: Props) => {
  const router = useRouter()

  const { header } = Tr(router.locale)

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
          )}
          <LangSwitcher />
        </div>

        {!isAuth && (
          <div className={'flex gap-6'}>
            <Button as={Link} href={SIGN_IN} variant={'link'}>
              {/*todo*/}
              {header.sign_in}
            </Button>
            <Button as={Link} href={SIGN_UP} variant={'primary'}>
              {/*todo*/}
              {header.sign_up}
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
