import SignInImg from '@/shared/assets/img/sign-up_bro.png'
import { SIGN_IN } from '@/shared/config/router'
import { translate } from '@/shared/lib/langSwitcher'
import { Button } from '@/shared/ui'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Confirmation.module.scss'

export const ConfirmEmail = () => {
  const t = translate(useRouter().locale)

  return (
    <div className={s.root}>
      <div className={s.textWrapper}>
        <h2 className={s.title}>{t['Congratulations!']}</h2>
        <div>{t['Your email has been confirmed']}</div>
        <Button as={Link} href={SIGN_IN}>
          {t['Sign In']}
        </Button>
      </div>
      <Image alt={'img'} className={s.img} priority src={SignInImg} />
    </div>
  )
}
