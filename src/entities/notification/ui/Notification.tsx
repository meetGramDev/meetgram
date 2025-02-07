import { getTimeAgo } from '@/features/posts/comments'
import { Wastebasket } from '@/shared/assets/icons/Wastebasket'
import { Button } from '@/shared/ui'

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
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.headerWrapper}>
          Новое уведомление!
          {!isRead && <p className={s.subHeader}>&nbsp;Новое</p>}
        </div>
        <p className={s.notificationMessage}>{message}</p>
        <div className={s.time}>{getTimeAgo('en', createdAt)}</div>
      </div>
      <Button onClick={() => deleteNotification(id)} variant={'link'}>
        <Wastebasket />
      </Button>
    </div>
  )
}
