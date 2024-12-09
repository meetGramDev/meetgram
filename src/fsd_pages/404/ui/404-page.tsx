import { PUBLIC_PAGE } from '@/shared/config/router'
import { useTranslate } from '@/shared/lib'
import { Button, Logo404 } from '@/shared/ui'
import Link from 'next/link'

import s from './style.module.scss'

export const Page404 = () => {
  const t = useTranslate()

  return (
    <div className={s.screensaver}>
      <Logo404 />
      <Logo404 xStart={250} yStart={476} />
      <Logo404 xStart={1500} yStart={130} />
      <div className={s.message}>
        <p>{t('404.Page not found')}</p>
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
