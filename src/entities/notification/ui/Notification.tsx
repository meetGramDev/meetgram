import { getTimeAgo } from '@/features/posts/comments'
import { Wastebasket } from '@/shared/assets/icons/Wastebasket'
import { useTranslate } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './Notification.module.scss'

export type NotificationProps = {
  createdAt: string
  deleteNotification: (id: number) => void
  id: number
  isRead?: boolean
  message: string
}

export const Notification = ({
  createdAt,
  deleteNotification,
  id,
  isRead,
  message,
}: NotificationProps) => {
  const t = useTranslate()
  const { locale } = useRouter()

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.headerWrapper}>
          {/*Новое уведомление!*/}
          {t('New notification')}
          {!isRead && <p className={s.subHeader}>&nbsp;{t('New')}</p>}
        </div>
        <p className={s.notificationMessage}>{message}</p>
        <div className={s.time}>{getTimeAgo(locale, createdAt)}</div>
      </div>
      <Button className={'z-10'} onClick={() => deleteNotification(id)} variant={'link'}>
        <Wastebasket />
      </Button>
    </div>
  )
}
