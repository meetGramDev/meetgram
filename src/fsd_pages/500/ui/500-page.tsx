import { PUBLIC_PAGE } from '@/shared/config/router'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Logo500 } from '@/shared/ui/500/Logo500'
import Link from 'next/link'

import s from './style.module.scss'

export const Page500 = () => {
  const t = useTranslate()

  return (
    <div className={s.screensaver}>
      <Logo500 />
      <Logo500 xStart={250} yStart={476} />
      <Logo500 xStart={1500} yStart={130} />
      <div className={s.message}>
        <p>{t('500.Server error')}</p>
        <br />
        <p>
          {t('404.Go back to')}
          <Button as={Link} className={s.link} href={PUBLIC_PAGE} variant={'text'}>
            {t('404.Homepage')}
          </Button>
        </p>
      </div>
    </div>
  )
}
