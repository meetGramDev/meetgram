import { NotificationType } from '@/entities/notification/model/types/service.types'
import { getTimeAgo } from '@/features/posts/comments'

import s from './Notification.module.scss'

export type NotificationProps = {
  createdAt: string
  id?: number
  isRead?: boolean
  message: string
}

export const Notification = ({ createdAt, id, isRead, message }: NotificationProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.headerWrapper}>
        Новое уведомление!
        {!isRead && <p className={s.subHeader}>&nbsp;Новое</p>}
      </div>
      <p className={s.notificationMessage}>{message}</p>
      <div className={s.time}>{getTimeAgo('en', createdAt)}</div>
    </div>
  )
}
